import { test, expect } from '@playwright/test';

test.describe('Login Page', () => {
    test.beforeEach('should load login page successfully', async ({ page }) => {
        // Assuming the app runs on localhost:3000
        await page.goto('http://localhost:3000');

        const login_button = page.getByText("Login")
        await expect(login_button).toBeVisible();

        // Click on login button
        await login_button.click();

        // Check redirect URL /login
        await expect(page).toHaveURL('http://localhost:3000/login');

        // Check for the heading
        await expect(page.locator('h2')).toContainText('Login');

        // Check for inputs
        await expect(page.getByPlaceholder('Email')).toBeVisible();
        await expect(page.getByPlaceholder('Password')).toBeVisible();

        // Enter email and password
        await page.getByPlaceholder('Email').fill('test@test.com');
        await page.getByPlaceholder('Password').fill('test');

        // Check for buttons
        await expect(page.getByRole('button', { name: 'Submit' })).toBeVisible();

        // Click on submit button
        await page.getByRole('button', { name: 'Submit' }).click();

        // Check if logout button appears
        await expect(page.getByRole('link', { name: 'Logout' })).toBeVisible();
    });

    test('create blog', async ({ page }) => {
        // random name bytes salt
        const random_name = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

        await page.getByRole('tab', { name: 'Add Blog' }).click();
        await page.locator('input[name="title"]').click();
        await page.locator('input[name="title"]').fill(random_name);
        await page.locator('textarea[name="description"]').click();
        await page.locator('textarea[name="description"]').fill('hello world');
        await page.locator('input[name="imageURL"]').click();
        await page.locator('input[name="imageURL"]').fill('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXNAxASqqE9qpik19nMqI0KjC2NwWQQ2IxbA&s');
        await page.getByRole('button', { name: 'Submit' }).click();
        await expect(page.getByRole('main')).toContainText(random_name);
    })


});
