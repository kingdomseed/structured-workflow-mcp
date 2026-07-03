# Storing API Keys Securely

Store all **client-side** API keys inside `.env` files at the root of the project.

Example:

```zsh
# Environment variables and API keys

# For CLI usage, source this file to set environment variables:
#   set -a; source .env; set +a
#   dart run cli/bin/cli.dart -v <video-file>

# For Flutter app usage (future):
#   flutter run --dart-define-from-file=.env

GITHUB_ACCESS_TOKEN=github_pat_<your-api-key>
```

## API keys setup in VSCode and Android Studio

If a `.vscode/launch.json` file exists, ensure that `[ "--dart-define-from-file", ".env" ]` is added to the `args` array for all launch configurations. This is necessary to ensure that the API keys are loaded when running the app from the IDE.

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Dev | Debug",
      "request": "launch",
      "type": "dart",
      "args": [ "--dart-define-from-file", ".env" ]
    },
  ]
}
```

If using Android Studio, ensure each run configuration includes `"--dart-define-from-file=.env"` in the `additionalArgs` array:

```xml
<component name="ProjectRunConfigurationManager">
  <configuration default="false" name="DEV | DEBUG" type="FlutterRunConfigurationType" factoryName="Flutter">
    <option name="buildFlavor" value="dev" />
    <option name="filePath" value="$PROJECT_DIR$/lib/main_dev.dart" />
    <option name="additionalArgs" value="--dart-define-from-file=.env" />
    <method v="2" />
  </configuration>
</component>
```

## Important Note for Production Apps

For **production** apps that need maximum security:

- The API key should be stored on your own secure server (and NEVER on the client)
- It should never be transmitted back to the client (to prevent man-in-the-middle attacks)
- The client should only communicate with your server, which acts as a proxy for the 3rd party API you intend to use

Why? Storing API keys on the client is insecure and can cause various issues if they become compromised.

But not all keys are created equal: some keys can be accessed by the client while others must be secret and stored securely on the server (the Stripe documentation does a good job explaining this).

### Examples of API keys and where to store them

- `SENTRY_DSN`:
  - **client** (needed to initialize the Sentry SDK)
- `MIXPANEL_PROJECT_TOKEN`:
  - **client** (needed to initialize the Mixpanel SDK)
- `GITHUB_ACCESS_TOKEN`:
  - **client** or **server** (only enforces a rate limit, not a security risk if exposed)
- `OPENAI_API_KEY`:
  - **server** (pay per use, will cost you money if exposed)
- `STRIPE_SECRET_KEY`:
  - **server**
- `STRIPE_PUBLISHABLE_KEY`:
  - **client**
