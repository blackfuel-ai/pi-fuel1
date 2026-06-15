# pi-fuel1

A [pi](https://pi.dev) extension that dynamically registers all [Fuel1.ai](https://fuel1.ai) models as a provider. Models are fetched live on startup, so new model releases appear automatically.

## Installation

```bash
pi install git:github.com/blackfuel-ai/pi-fuel1
```

The extension auto-discovers on next pi startup — no `/reload` needed.

## Setup

Get an API key at [fuel1.ai](https://fuel1.ai), then add it to `~/.pi/agent/auth.json`:

```json
{
  "fuel1": {
    "type": "api_key",
    "key": "bf_your_key_here"
  }
}
```

Alternatively, set the `FUEL1_API_KEY` environment variable:

```bash
export FUEL1_API_KEY=bf_your_key_here
```

The extension reads from `auth.json` first and falls back to the env var.

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
