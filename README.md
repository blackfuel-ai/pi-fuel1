# pi-fuel1

A [pi](https://pi.dev) extension that dynamically registers all [Fuel1.ai](https://console.fuel1.ai) models as a provider. Models are fetched live on startup, so new model releases appear automatically.

## Installation

```bash
pi install git:github.com/blackfuel-ai/pi-fuel1
```

The extension auto-discovers on next pi startup — no `/reload` needed.

## Setup

Get an API key at [console.fuel1.ai](https://console.fuel1.ai), then in pi run `/login`, choose
**Use an API key**, and select **Fuel1**. Paste your key when prompted — pi stores
it in `~/.pi/agent/auth.json`.

Alternatively, set the `FUEL1_API_KEY` environment variable:

```bash
export FUEL1_API_KEY=bf_your_key_here
```

The extension reads the key stored via `/login` first, then falls back to the env var.

## Usage

Verify the models are available:

```bash
pi --list-models
```

You should see all Fuel1 models listed under the `fuel1` provider.

Select a model via the model selector (`Ctrl+P`) or by typing:

```
/model fuel1
```

## Update

```bash
pi update
```

Or after upgrading, run `/reload` in pi.
