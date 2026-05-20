# Игра «Охота на гоблина»

[![Build and Deploy to GitHub Pages](https://github.com/ExFafurion/pic2/actions/workflows/ci.yml/badge.svg)](https://github.com/ExFafurion/pic2/actions/workflows/ci.yml)

**GitHub Pages**: https://ExFafurion.github.io/pic2/

## Описание

Игровое поле 4x4. Каждую секунду в случайной ячейке появляется гоблин. Нужно успеть кликнуть по нему молотком. За попадание даётся +1 очко, за пропуск — +1 к счётчику промахов. После 5 промахов игра заканчивается.

## Технологии

- JavaScript (ES6+), ООП
- Webpack, Babel
- Yarn (менеджер пакетов)
- ESLint, Jest
- GitHub Actions (CI/CD)

## Запуск

```bash
yarn install
yarn start