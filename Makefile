report:
	npx playwright show-report
wolf: 
	npx playwright test wolf-test.spec.js 
failed:
	npx playwright test --last-failed
all: 
	npx playwright test 