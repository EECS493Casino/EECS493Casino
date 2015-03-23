# In order to test via command line, I have the ui compiling seperately
# Please have the most recent TypeScript compiler
TypeScriptCompiler:= tsc
output:= js/blackjack.js
input:= main.ts
ui:= ui.ts

all:
	$(TypeScriptCompiler) $(input) $(ui) --out $(output)

no-ui:
	$(TypeScriptCompiler) $(input) --out $(output)

run:
	nodejs $(output)
