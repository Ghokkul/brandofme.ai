/* Entry point. Boots the HTTP server. */
const app = require('./src/app');
const config = require('./src/config');

app.listen(config.port, () => {
  console.log('────────────────────────────────────────────────');
  console.log(' brandofme.ai backend');
  console.log(' Listening on  ' + config.publicBase);
  console.log(' Data store    ' + config.dataDir + ' (JSON file)');
  console.log(' Trial length  ' + config.trialDays + ' days');
  console.log(' Simulated social sign-in: ' + (config.allowSimulatedSocial ? 'ON (dev)' : 'off'));
  console.log(' Stripe        ' + (config.stripeKey ? 'live key set' : 'SIMULATED (no key)'));
  console.log('────────────────────────────────────────────────');
  console.log(' Try: curl ' + config.publicBase + '/api/health');
});
