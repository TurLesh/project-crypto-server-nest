import { NestFactory } from '@nestjs/core';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerModule } from '@nestjs/swagger/dist';
import { AppModule } from './app.module';
import { ValidationPipe } from './pipes/validation.pipe';
// import { JwtAuthGuard } from './auth/jwt-auth.guard';

async function start() {
    const PORT = process.env.PORT || 5000;
    const app = await NestFactory.create(AppModule);

    // swagger docs block starts here //
    const config = new DocumentBuilder()
        .setTitle('REST API used for auth actions in "project-crypto"')
        .setDescription('REST API documentation')
        .setVersion('1.0.0')
        .addTag('Lesh')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/api/docs', app, document);
    // swagger docs block ends here //

    // set auth required to use api for all endpoints
    // app.useGlobalGuards(JwtAuthGuard)

    //set validation pipe for all endpoints
    app.useGlobalPipes(new ValidationPipe());

    await app.listen(PORT, () => console.log(`Server started on port = ${PORT}`));
}

start();
