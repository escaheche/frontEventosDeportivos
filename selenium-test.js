import { Builder, By, Key, until } from 'selenium-webdriver';

(async function example() {
    // Modificar el constructor para que se conecte a Selenium Grid
    let driver = await new Builder()
        .usingServer('http://localhost:4444/wd/hub')  // URL del Hub de Selenium Grid
        .forBrowser('chrome')  // Puedes cambiar 'chrome' por otro navegador si es necesario
        .build();
    
    try {
        await driver.get('http://localhost:5173');

        // Click en "Acceder con Correo"
        await driver.wait(until.elementLocated(By.xpath("//button[contains(text(),'Acceder con Correo')]")), 20000);
        await driver.findElement(By.xpath("//button[contains(text(),'Acceder con Correo')]")).click();

        // Validar existencia y enviar datos
        let emailInput = await driver.findElement(By.id('email'));
        if (await emailInput.isDisplayed()) {
            console.log("Email input is present.");
            await emailInput.sendKeys('felipe.martinez@example.com');
        } else {
            console.log("Email input is not present.");
            return;
        }

        let passwordInput = await driver.findElement(By.id('password'));
        if (await passwordInput.isDisplayed()) {
            console.log("Password input is present.");
            await passwordInput.sendKeys('12345678');
        } else {
            console.log("Password input is not present.");
            return;
        }

        let loginButton = await driver.findElement(By.xpath("//button[contains(text(),'Iniciar Sesión')]"));
        if (await loginButton.isDisplayed()) {
            console.log("Login button is present.");
            await loginButton.click();
        } else {
            console.log("Login button is not present.");
            return;
        }

        console.log("Login test passed successfully.");

    } catch (error) {
        console.error("Error during the login test:", error);
    } 
})();
