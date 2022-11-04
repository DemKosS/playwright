 //Тест 1. Успешная авторизация
 const { test } = require('@playwright/test');
 const {User} = require("../user.js")
 
 
 const config = {
   headless: false,
   timeout: 30000,
   globalTimeout: 600000,
   reporter: 'list',
   testDir: './tests',
 };
 
 test.describe('two tests', () => {
 
 test('Успешная авторизация', async({page}) => {
   
   const userInstance = new User()
   let login =  userInstance.login;
   let password = userInstance.password;
   await page.goto('https://netology.ru/?modal=sign_in');
   await page.click('[name="email"]');   
   await page.fill('[placeholder="Email"]', login);    
   await page.click('[name="password"]');
   await page.fill('[placeholder="Пароль"]', password);
   await Promise.all([
     page.waitForNavigation(/*{ url: 'https://netology.ru/profile' }*/),
     page.click('[data-testid="login-submit-btn"]')
   ]);
   await expect(page.url()).toBe("https://netology.ru/profile");
   await expect(page.locator("h2")).toHaveText("Мои курсы и профессии");

  await browser.close();
 });
 
 //Тест 2. Неуспешная авторизация
 test('Неуспешная авторизация', async({page}) => {
   await page.goto('https://netology.ru/?modal=sign_in');
   await page.click('[name="email"]');   
   await page.fill('[placeholder="Email"]', "login@mail.ru");    
   await page.click('[name="password"]');
   await page.fill('[placeholder="Пароль"]', "password");
   await page.click('[data-testid="login-submit-btn"]');
   
   await expect(page.locator("data-testid=login-error-hint")).toContainText("Вы ввели неправильно логин или пароль");
     
   await browser.close();
 });
 
 })
 