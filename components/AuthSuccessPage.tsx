import type { FC } from 'hono/jsx'
import { createTranslator } from '../i18n.ts'

interface AuthSuccessPageProps {
	lng?: string
}

export const AuthSuccessPage: FC<AuthSuccessPageProps> = ({ lng }) => {
	const t = createTranslator(lng)
	return (
		<html>
			<head>
				<title>{t('auth.success')}</title>
				<link rel="icon" type="image/svg+xml" href="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTAgMTZDMCA4LjQ1NzUzIDAgNC42ODYyOSAyLjM0MzE1IDIuMzQzMTVDNC42ODYyOSAwIDguNDU3NTMgMCAxNiAwQzIzLjU0MjUgMCAyNy4zMTM3IDAgMjkuNjU2OSAyLjM0MzE1QzMyIDQuNjg2MjkgMzIgOC40NTc1MyAzMiAxNkMzMiAyMy41NDI1IDMyIDI3LjMxMzcgMjkuNjU2OSAyOS42NTY5QzI3LjMxMzcgMzIgMjMuNTQyNSAzMiAxNiAzMkM4LjQ1NzUzIDMyIDQuNjg2MjkgMzIgMi4zNDMxNSAyOS42NTY5QzAgMjcuMzEzNyAwIDIzLjU0MjUgMCAxNloiIGZpbGw9IiMzMzY2RkYiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xOC41MzMzIDIxLjk2NzRDMTguNTMzMyAyMi43MDk0IDE5LjQ5NTggMjMuMDAwOCAxOS45MDc0IDIyLjM4MzRMMjQuNTExNSAxNS40NzcxQzI0Ljg0MzggMTQuOTc4NyAyNC40ODY1IDE0LjMxMTEgMjMuODg3NSAxNC4zMTExSDIwLjIyMjJWMTAuMDMyNkMyMC4yMjIyIDkuMjkwNTggMTkuMjU5OCA4Ljk5OTE4IDE4Ljg0ODIgOS42MTY2MUwxNC4yNDQgMTYuNTIyOUMxMy45MTE3IDE3LjAyMTMgMTQuMjY5IDE3LjY4ODkgMTQuODY4MSAxNy42ODg5SDE4LjUzMzNWMjEuOTY3NFoiIGZpbGw9IndoaXRlIi8+CjxnIG9wYWNpdHk9IjAuMyI+CjxwYXRoIGQ9Ik04LjQgMTEuMzU1NUM4LjQgMTAuNjU2IDguOTY3MTEgMTAuMDg4OSA5LjY2NjY3IDEwLjA4ODlIMTMuODg4OUMxNC41ODg1IDEwLjA4ODkgMTUuMTU1NiAxMC42NTYgMTUuMTU1NiAxMS4zNTU1QzE1LjE1NTYgMTIuMDU1MSAxNC41ODg1IDEyLjYyMjIgMTMuODg4OSAxMi42MjIySDkuNjY2NjdDOC45NjcxMSAxMi42MjIyIDguNCAxMi4wNTUxIDguNCAxMS4zNTU1WiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZD0iTTguNCAyMS40ODg5QzguNCAyMC43ODkzIDguOTY3MTEgMjAuMjIyMiA5LjY2NjY3IDIwLjIyMjJIMTMuODg4OUMxNC41ODg1IDIwLjIyMjIgMTUuMTU1NiAyMC43ODkzIDE1LjE1NTYgMjEuNDg4OUMxNS4xNTU2IDIyLjE4ODQgMTQuNTg4NSAyMi43NTU1IDEzLjg4ODkgMjIuNzU1NUg5LjY2NjY3QzguOTY3MTEgMjIuNzU1NSA4LjQgMjIuMTg4NCA4LjQgMjEuNDg4OVoiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik03Ljk3Nzc4IDE1LjE1NTZDNC4yNzgyMiAxNS4xNTU2IDYuNzExMTEgMTUuNzIyNyA2LjcxMTExIDE2LjQyMjJDNi43MTExMSAxNy4xMjE4IDcuMjc4MjIgMTcuNjg4OSA3Ljk3Nzc4IDE3LjY4ODlIMTEuMzU1NkMxMi4wNTUxIDE3LjY4ODkgMTIuNjIyMiAxNy4xMjE4IDEyLjYyMjIgMTYuNDIyMkMxMi42MjIyIDE1LjcyMjcgMTIuMDU1MSAxNS4xNTU2IDExLjM1NTYgMTUuMTU1Nkg3Ljk3Nzc4WiIgZmlsbD0id2hpdGUiLz4KPC9nPgo8L3N2Zz4K" />
				<style
					dangerouslySetInnerHTML={{
						__html: `
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                height: 100vh;
                margin: 0;
                background-color: #ffffff;
              }
              .container {
                text-align: center;
                padding: 48px 32px;
                max-width: 400px;
                width: 100%;
              }
              .icon {
                width: 36px;
                height: 36px;
                margin: 0 auto 24px auto;
                display: block;
              }
              .title {
                color: #192038;
                font-size: 28px;
                font-weight: 500;
                margin-bottom: 16px;
              }
              .description {
                color: #192038;
                font-size: 16px;
                font-weight: 400;
                margin-bottom: 40px;
              }
              .button {
                background-color: #3366FF;
                color: white;
                text-decoration: none;
                padding: 9px 24px;
                border-radius: 8px;
                font-size: 16px;
                font-weight: 500;
                line-height: 24px;
                display: inline-block;
                border: none;
                cursor: pointer;
                transition: background-color 0.2s ease;
                width: 350px;
                box-sizing: border-box;
              }
              .button:hover {
                background-color: #2952CC;
              }
            `,
					}}
				/>
			</head>
			<body>
				<div className='container'>
					<svg className='icon' width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M0 16C0 8.45753 0 4.68629 2.34315 2.34315C4.68629 0 8.45753 0 16 0C23.5425 0 27.3137 0 29.6569 2.34315C32 4.68629 32 8.45753 32 16C32 23.5425 32 27.3137 29.6569 29.6569C27.3137 32 23.5425 32 16 32C8.45753 32 4.68629 32 2.34315 29.6569C0 27.3137 0 23.5425 0 16Z" fill="#3366FF"/>
						<path fillRule="evenodd" clipRule="evenodd" d="M18.5333 21.9674C18.5333 22.7094 19.4958 23.0008 19.9074 22.3834L24.5115 15.4771C24.8438 14.9787 24.4865 14.3111 23.8875 14.3111H20.2222V10.0326C20.2222 9.29058 19.2598 8.99918 18.8482 9.61661L14.244 16.5229C13.9117 17.0213 14.269 17.6889 14.8681 17.6889H18.5333V21.9674Z" fill="white"/>
						<g opacity="0.3">
							<path d="M8.4 11.3555C8.4 10.656 8.96711 10.0889 9.66667 10.0889H13.8889C14.5885 10.0889 15.1556 10.656 15.1556 11.3555C15.1556 12.0551 14.5885 12.6222 13.8889 12.6222H9.66667C8.96711 12.6222 8.4 12.0551 8.4 11.3555Z" fill="white"/>
							<path d="M8.4 21.4889C8.4 20.7893 8.96711 20.2222 9.66667 20.2222H13.8889C14.5885 20.2222 15.1556 20.7893 15.1556 21.4889C15.1556 22.1884 14.5885 22.7555 13.8889 22.7555H9.66667C8.96711 22.7555 8.4 22.1884 8.4 21.4889Z" fill="white"/>
							<path d="M7.97778 15.1556C7.27822 15.1556 6.71111 15.7227 6.71111 16.4222C6.71111 17.1218 7.27822 17.6889 7.97778 17.6889H11.3556C12.0551 17.6889 12.6222 17.1218 12.6222 16.4222C12.6222 15.7227 12.0551 15.1556 11.3556 15.1556H7.97778Z" fill="white"/>
						</g>
					</svg>
					<div className='title'>{t('auth.success')}</div>
					<div className='description'>{t('auth.returning')}</div>
					<a href='figma://show' className='button'>
						{t('auth.openFigma')}
					</a>
				</div>
				<script
					dangerouslySetInnerHTML={{
						__html: `
              // 尝试自动拉起 Figma
              function openFigma() {
                // 首先尝试 figma:// URL scheme
                window.location.href = 'figma://show';

                // 备用方案：如果用户在桌面端，也可以尝试打开 Figma 网页版
                setTimeout(() => {
                  if (document.hasFocus()) {
                    // 如果页面仍然有焦点，说明 Figma 应用可能没有安装
                    // 可以选择打开 Figma 网页版作为备用
                    console.log('Figma app might not be installed, staying on this page');
                  }
                }, 1000);
              }

              // 页面加载后立即尝试打开 Figma
              window.onload = openFigma;

              // 也可以让用户手动点击
              document.addEventListener('click', function(e) {
                if (e.target.classList.contains('button')) {
                  e.preventDefault();
                  openFigma();
                }
              });
            `,
					}}
				/>
			</body>
		</html>
	)
}
