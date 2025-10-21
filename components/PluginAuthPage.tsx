import type { FC } from 'hono/jsx'
import {env} from "../env.ts";

interface PluginAuthPageProps {
	state?: string
}

export const PluginAuthPage: FC<PluginAuthPageProps> = ({ state }) => {
	return (
		<html>
			<head>
				<title>MuseDAM Figma Plugin Oauth</title>
				<link rel="icon" type="image/svg+xml" href="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTAgMTZDMCA4LjQ1NzUzIDAgNC42ODYyOSAyLjM0MzE1IDIuMzQzMTVDNC42ODYyOSAwIDguNDU3NTMgMCAxNiAwQzIzLjU0MjUgMCAyNy4zMTM3IDAgMjkuNjU2OSAyLjM0MzE1QzMyIDQuNjg2MjkgMzIgOC40NTc1MyAzMiAxNkMzMiAyMy41NDI1IDMyIDI3LjMxMzcgMjkuNjU2OSAyOS42NTY5QzI3LjMxMzcgMzIgMjMuNTQyNSAzMiAxNiAzMkM4LjQ1NzUzIDMyIDQuNjg2MjkgMzIgMi4zNDMxNSAyOS42NTY5QzAgMjcuMzEzNyAwIDIzLjU0MjUgMCAxNloiIGZpbGw9IiMzMzY2RkYiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xOC41MzMzIDIxLjk2NzRDMTguNTMzMyAyMi43MDk0IDE5LjQ5NTggMjMuMDAwOCAxOS45MDc0IDIyLjM4MzRMMjQuNTExNSAxNS40NzcxQzI0Ljg0MzggMTQuOTc4NyAyNC40ODY1IDE0LjMxMTEgMjMuODg3NSAxNC4zMTExSDIwLjIyMjJWMTAuMDMyNkMyMC4yMjIyIDkuMjkwNTggMTkuMjU5OCA4Ljk5OTE4IDE4Ljg0ODIgOS42MTY2MUwxNC4yNDQgMTYuNTIyOUMxMy45MTE3IDE3LjAyMTMgMTQuMjY5IDE3LjY4ODkgMTQuODY4MSAxNy42ODg5SDE4LjUzMzNWMjEuOTY3NFoiIGZpbGw9IndoaXRlIi8+CjxnIG9wYWNpdHk9IjAuMyI+CjxwYXRoIGQ9Ik04LjQgMTEuMzU1NUM4LjQgMTAuNjU2IDguOTY3MTEgMTAuMDg4OSA5LjY2NjY3IDEwLjA4ODlIMTMuODg4OUMxNC41ODg1IDEwLjA4ODkgMTUuMTU1NiAxMC42NTYgMTUuMTU1NiAxMS4zNTU1QzE1LjE1NTYgMTIuMDU1MSAxNC41ODg1IDEyLjYyMjIgMTMuODg4OSAxMi42MjIySDkuNjY2NjdDOC45NjcxMSAxMi42MjIyIDguNCAxMi4wNTUxIDguNCAxMS4zNTU1WiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZD0iTTguNCAyMS40ODg5QzguNCAyMC43ODkzIDguOTY3MTEgMjAuMjIyMiA5LjY2NjY3IDIwLjIyMjJIMTMuODg4OUMxNC41ODg1IDIwLjIyMjIgMTUuMTU1NiAyMC43ODkzIDE1LjE1NTYgMjEuNDg4OUMxNS4xNTU2IDIyLjE4ODQgMTQuNTg4NSAyMi43NTU1IDEzLjg4ODkgMjIuNzU1NUg5LjY2NjY3QzguOTY3MTEgMjIuNzU1NSA4LjQgMjIuMTg4NCA4LjQgMjEuNDg4OVoiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik03Ljk3Nzc4IDE1LjE1NTZDNC4yNzgyMiAxNS4xNTU2IDYuNzExMTEgMTUuNzIyNyA2LjcxMTExIDE2LjQyMjJDNi43MTExMSAxNy4xMjE4IDcuMjc4MjIgMTcuNjg4OSA3Ljk3Nzc4IDE3LjY4ODlIMTEuMzU1NkMxMi4wNTUxIDE3LjY4ODkgMTIuNjIyMiAxNy4xMjE4IDEyLjYyMjIgMTYuNDIyMkMxMi42MjIyIDE1LjcyMjcgMTIuMDU1MSAxNS4xNTU2IDExLjM1NTYgMTUuMTU1Nkg3Ljk3Nzc4WiIgZmlsbD0id2hpdGUiLz4KPC9nPgo8L3N2Zz4K" />
			</head>
			<body>
				<script
					dangerouslySetInnerHTML={{
						__html: `
              function encodeBase64(input) {
                if (Uint8Array.prototype.toBase64) {
                  return input.toBase64();
                }
                const CHUNK_SIZE = 0x8000;
                const arr = [];
                for (let i = 0; i < input.length; i += CHUNK_SIZE) {
                  arr.push(String.fromCharCode.apply(null, input.subarray(i, i + CHUNK_SIZE)));
                }
                return btoa(arr.join(''));
              }
              
              function encodeUrlBase64(input) {
                let unencoded = input;
                if (typeof unencoded === 'string') {
                  const encoder = new TextEncoder();
                  unencoded = encoder.encode(unencoded);
                }
                if (Uint8Array.prototype.toBase64) {
                  return unencoded.toBase64({ alphabet: 'base64url', omitPadding: true });
                }
                return encodeBase64(unencoded).replace(/=/g, '').replace(/\\+/g, '-').replace(/\\//g, '_');
              }
              
              function encodeState(payload) {
                try {
                  const header = { alg: 'none' };
                  const encodedHeader = encodeUrlBase64(JSON.stringify(header));
                  const encodedPayload = encodeUrlBase64(JSON.stringify(payload));
                  // For unsecured JWTs, we just concatenate header and payload with empty signature
                  return \`\${encodedHeader}.\${encodedPayload}.\`;
                } catch (error) {
                  throw new Error(\`Failed to encode state: \${error}\`);
                }
              }
              
              const payload = {
                returnTo: "${env.CALLBACK_URL}/write?state=${state}",
              };

              const redirectUrl = \`${env.MUSEDAM_AUTH_URL}?state=\${encodeState(payload)}\`;
              console.log('redirectUrl', redirectUrl);
              
              window.location = redirectUrl;
            `,
					}}
				/>
			</body>
		</html>
	)
}
