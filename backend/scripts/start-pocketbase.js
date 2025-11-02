const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const pbPath = path.join(__dirname, '..', 'pocketbase');

if (!fs.existsSync(pbPath)) {
  console.error('❌ Pocketbase не найден!');
  console.error('📥 Скачайте Pocketbase: https://pocketbase.io/docs/');
  console.error('📁 Поместите исполняемый файл в: backend/pocketbase');
  process.exit(1);
}

console.log('🚀 Запуск Pocketbase...');

const pb = spawn(pbPath, ['serve', '--http=127.0.0.1:8090'], {
  cwd: path.join(__dirname, '..'),
  stdio: 'inherit'
});

pb.on('error', (err) => {
  console.error('❌ Ошибка запуска:', err);
});

pb.on('close', (code) => {
  if (code !== 0) {
    console.error(`❌ Pocketbase завершился с кодом ${code}`);
  }
});

process.on('SIGINT', () => {
  pb.kill();
  process.exit();
});

