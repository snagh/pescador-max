const http = require('http');
const { exec } = require('child_process');
const { config, globalStorage } = require('C:/Users/aprom/AppData/Roaming/npm/node_modules/@zeppos/zeus-cli/private-modules/zeppos-app-utils/dist/index.js');

const { loginConfig, loginStorageKey } = config.getLocalConfig();
const port = 4567;
const callbackPath = '/login/callback';
const redirectUri = `http://localhost:${port}${callbackPath}`;

const loginUrl = `${loginConfig.LOGIN_URL}?project_name=${loginConfig.PROJECT_NAME}&platform_app=${loginConfig.PLATFORM_APP}&project_redirect_uri=${encodeURIComponent(redirectUri)}`;

const server = http.createServer((req, res) => {
  const reqUrl = req.url || '';
  if (reqUrl.startsWith(callbackPath)) {
    const parsed = new URL(`http://localhost:${port}${reqUrl}`);
    const appToken = parsed.searchParams.get('apptoken');
    const userId = parsed.searchParams.get('userid');
    const cname = parsed.searchParams.get('cname');

    if (appToken && cname) {
      globalStorage.set({
        [loginStorageKey.accountToken]: appToken,
        [loginStorageKey.userid]: userId,
        [loginStorageKey.cname]: cname,
      });

      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.end(`
        <html>
          <body style="font-family: sans-serif; text-align: center; padding: 50px;">
            <h1 style="color: #10b981;">Login efetuado com sucesso!</h1>
            <p>Pode fechar esta aba e voltar para o chat. O QR Code oficial sera gerado agora.</p>
          </body>
        </html>
      `);

      console.log('LOGIN_SUCCESS');
      setTimeout(() => {
        server.close();
        process.exit(0);
      }, 1000);
    } else {
      res.statusCode = 400;
      res.end('Falha ao autenticar.');
    }
  }
});

server.listen(port, () => {
  console.log('LOGIN_URL_READY:' + loginUrl);
  // Open in default browser
  exec(`start "" "${loginUrl}"`, (err) => {});
});
