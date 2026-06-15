import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";
import { AuthStorage } from "@earendil-works/pi-coding-agent";

interface OpenAIModel {
	id: string;
	object: string;
	created: number;
	owned_by: string;
}

interface OpenAIModelsResponse {
	object: string;
	data: OpenAIModel[];
}

export default async function (pi: ExtensionAPI): Promise<void> {
	const auth = AuthStorage.create();
	const apiKey = (await auth.getApiKey("fuel1")) ?? process.env.FUEL1_API_KEY;
	if (!apiKey) {
		console.warn(
			"[fuel1-provider] No API key found. Run /login, choose \"Use an API key\", and select Fuel1 — or set FUEL1_API_KEY.",
		);
		return;
	}

	let models: { id: string }[];

	try {
		const response = await fetch("https://api.fuel1.ai/v1/models", {
			headers: {
				Authorization: `Bearer ${apiKey}`,
				"Content-Type": "application/json",
			},
		});

		if (!response.ok) {
			console.warn(
				`[fuel1-provider] Failed to fetch models from Fuel1.ai (HTTP ${response.status}). Provider will not be registered.`,
			);
			return;
		}

		const payload = (await response.json()) as OpenAIModelsResponse;

		if (!payload.data || !Array.isArray(payload.data)) {
			console.warn(
				"[fuel1-provider] Unexpected response format from /v1/models. Provider will not be registered.",
			);
			return;
		}

		models = payload.data.map((m) => ({ id: m.id }));
	} catch (error) {
		console.warn(
			`[fuel1-provider] Failed to reach Fuel1.ai API: ${error instanceof Error ? error.message : String(error)}. Provider will not be registered.`,
		);
		return;
	}

	if (models.length === 0) {
		console.warn("[fuel1-provider] No models returned from Fuel1.ai. Provider will not be registered.");
		return;
	}

	pi.registerProvider("fuel1", {
		name: "Fuel1",
		baseUrl: "https://api.fuel1.ai/v1",
		apiKey: "$FUEL1_API_KEY",
		api: "openai-completions",
		models: models.map((model) => ({
			id: model.id,
			name: model.id,
			reasoning: false,
			input: ["text"] as ("text" | "image")[],
			cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
			contextWindow: 128000,
			maxTokens: 16384,
		})),
	});
}
