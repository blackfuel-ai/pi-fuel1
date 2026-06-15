# Fuel1 Pi Provider

A [pi](https://pi.dev) extension that dynamically registers all [Fuel1.ai](https://fuel1.ai) models as a provider.

## Installation

```bash
pi install git:github.com/blackfuel-ai/pi-fuel1
```

## Setup

Add your Fuel1 API key to `~/.pi/agent/auth.json`:

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

## Usage

Verify the models are available:

```bash
pi --list-models
```

You should see all Fuel1 models listed under the `fuel1` provider.

Select a model via the model selector (`Ctrl+P`) or by running:

```
/model fuel1
```

## Update

```bash
pi update
```

Or after a `git pull`, run `/reload` in pi.
