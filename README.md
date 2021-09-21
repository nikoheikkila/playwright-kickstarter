# Kickstarter for Playwright Test Runner

![Logo](logo.png)

[![Build and Test Site](https://github.com/nikoheikkila/playwright-kickstarter/actions/workflows/test.yml/badge.svg?branch=main&event=push)](https://github.com/nikoheikkila/playwright-kickstarter/actions/workflows/test.yml)
[![Netlify Status](https://api.netlify.com/api/v1/badges/f876834f-e00a-476b-b84b-4eec2d530985/deploy-status)](https://app.netlify.com/sites/playwright-kickstarter/deploys)

This repository teaches how to use [**Playwright**][pw] and its test runner (`@playwright/test`) in a fresh React + Vite front-end application.

## Install

1. Fork and clone the repository
1. Run `yarn` to install dependencies
1. Run `yarn build` to build the application

## Tests

Test suites live inside the `tests/` directory. As this is a starter repository, they only test the landing page of the provided Vite application. 

Tests are structured in the popular BDD syntax and use the _Given/When/Then_ pattern.

1. Run end-to-end tests with `yarn test:e2e`
1. Write more tests, implement new features — rinse and repeat!

## Configuration

Playwright configuration lives [here](./playwright.config.ts). Feel free to tinker and experiment different [options][options].

[pw]: https://playwright.dev
[options]: https://playwright.dev/docs/test-advanced#configuration-object
