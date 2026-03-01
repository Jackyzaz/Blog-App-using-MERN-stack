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

    })


});
