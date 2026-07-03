## Aliases

These aliases are already configured and can be used as needed:

```bash
alias fclean="flutter clean"
alias fpg="flutter pub get"
alias fpu="flutter pub upgrade"

alias brb="dart run build_runner build -d"
alias brw="dart run build_runner watch -d"

alias fpgbrb="fpg && brb"
alias fpgbrw="fpg && brw"
```

Note: assume `brw` is automatically running when working on a Flutter project that uses build_runner.
