const { execSync } = require('child_process');
const path = require('path');

try {
    console.log('Generating Prisma Client...');
    const prismaPath = path.join(__dirname, 'node_modules', '.bin', 'prisma');
    execSync(`"${prismaPath}" generate`, {
        stdio: 'inherit',
        cwd: __dirname,
        env: { ...process.env, FORCE_COLOR: '0' }
    });
    console.log('Prisma Client generated successfully!');
} catch (error) {
    console.error('Failed to generate Prisma Client:', error.message);
    process.exit(1);
}
