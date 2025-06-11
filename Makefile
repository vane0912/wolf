report:
	npx playwright show-report
wolf: 
	npx playwright test wolf-test.spec.js --workers 2 
failed:
	npx playwright test --last-failed
all: 
	npx playwright test 