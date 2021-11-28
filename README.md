<h1 align="center">
  <a href="https://github.com/Rabbittee/F2E-Bus-Frontend">
    <img src="docs/images/Cover.png" alt="Logo" />
  </a>
</h1>

<div align="center">
  Taiwan Bus Search
  <br />
  <a href="#about"><strong>Explore the screenshots »</strong></a>
  <br />
  <br />
  <a href="https://github.com/Rabbittee/F2E-Bus-Frontend/issues/new?assignees=&labels=bug&template=01_BUG_REPORT.md&title=bug%3A+">Report a Bug</a>
  ·
  <a href="https://github.com/Rabbittee/F2E-Bus-Frontend/issues/new?assignees=&labels=enhancement&template=02_FEATURE_REQUEST.md&title=feat%3A+">Request a Feature</a>
  .<a href="https://github.com/Rabbittee/F2E-Bus-Frontend/discussions">Ask a Question</a>
</div>

<div align="center">
<br />

[![Project license](https://img.shields.io/github/license/Rabbittee/F2E-Bus-Frontend)](LICENSE)

[![Pull Requests welcome](https://img.shields.io/badge/PRs-welcome-ff69b4.svg?style=flat-square)](https://github.com/Rabbittee/F2E-Bus-Frontend/issues?q=is%3Aissue+is%3Aopen+label%3A%22help+wanted%22)

</div>

<details open="open">
<summary>Table of Contents</summary>

- [About](#about)
  - [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Roadmap](#roadmap)
- [Support](#support)
- [Project assistance](#project-assistance)
- [Contributing](#contributing)
- [Authors & contributors](#authors--contributors)
- [Security](#security)
- [License](#license)
- [Acknowledgements](#acknowledgements)

</details>

---

## About

A bus search application for providing bus information in Taiwan.

Which let you:

- Find bus station or route information by search terms.
- Find the closest bus station near you by searching your location.

Our goal is providing more easiest and fastest way to get the bus information,
with clean UI / UX and reliable software system.

<details>
<summary>Screenshots</summary>
<br>

> **[?]**
> Please provide your screenshots here.

|                                 Home Page                                  |                                   Station Page                                   |                                  Route Page                                  |
| :------------------------------------------------------------------------: | :------------------------------------------------------------------------------: | :--------------------------------------------------------------------------: |
| <img src="docs/images/screenshot/home.png" title="Home Page" width="100%"> | <img src="docs/images/screenshot/station.png" title="Station Page" width="100%"> | <img src="docs/images/screenshot/route.png" title="Route Page" width="100%"> |

</details>

### Feature List

- System

  - [x] System will save your preference by default, and keep it 1 day.
  - [x] If any error occur, system will that you knows what happened by send you notification.
  - [x] System will ask your geolocation, but not force you.
  - [x] System will let you know they are busy by give you a cute car animation.

- Home Page

  - [x] Search

    User can search by terms using search bar,

    We make user interface as simple as possible to reduce the complexity of using,
    which depends on [Hick's law](https://en.wikipedia.org/wiki/Hick's_law).

  - [x] Recommand Search

    We provide `recommand search` results when page load,
    which using user current position by default.

  - [x] Realtime Search

    We provide `realtime search` when user typing,
    which will update the recommand search on the fly.

  - [x] Fuzzy Search

    When user doesn't get the result they want,
    they can just hit `search submit` or hit `enter`,
    system will provide the search results for them,
    which implement `fuzzy search` behind the scene.

    The priority of search below:

    1. if `term` match the `route name` exactly or there's only one `route` result,
       will navigate to `route` with route id.
    2. if `term` match the `station name` exactly or there's only one `station` result,
       will navigate to `station` with station id.
    3. if there have many `stations` in results,
       will navigate to `locations` with station results.
    4. if there have many `routes` in results without any `stations`,
       will stay at `home` but highlight the match results below.
    5. if there's no match,
       will navigate to `notfound` with your `term`.

  - [x] Recently Search

    When user navigate to the result,
    system will save the search history automatically,
    and present on the UI.
    system will keep your record 7 days, after that will expired.

- Map

  - [x] Was implemented by `leaflet`, `react-leaflet` and `mapbox`.
  - [x] We using `light-v10` mapbox style.

- Location Page

  - [x] Fuzzy Result

    When system get multiple `stations` results, will lead user to `locations` page,
    user have a right to can choose the results by themself.

  - [x] Nearby

    User can find nearby `stations` by specify `location`.

  - [x] URL

    You can send `url` link to your friends, system will give them same result as yours.

  - [x] Station List

    You can click `station` in list to navigate.

  - [x] Map

    - [x] We will give you `marker` with `number` on top, which map to the index of result list.
    - [x] You can click `marker` to navigate.

- Station Page

  - [x] URL

    You can send `url` link to your friends, system will give them same result as yours.

  - [x] Routes List

    - Routes information in every item will show:

      - [x] Route name
      - [x] Next arrival time
      - [x] Route departure and destination

    - [x] We provide current trip status below:

      - Default
      - Not Depart
      - Skipped
      - Terminate
      - Unscheduled

    - [x] Arrival Time

      System will give you next arrival time every 5 seconds.

  - Map

    - [x] We highlight the `marker` which you currently selected, with `station name` on top.
    - [x] We will give you `nearby station` with `number` on top, which map to the index of result list.
    - [x] You can navigate to `nearby station` with click `nearby station marker`.

- Route Page

  - [x] URL

    You can send `url` link to your friends, system will give them same result as yours.

  - Map

    - [x] We give user `current position` which depends on Geolocation from user's device.
    - [x] We will give you `station marker` by `direction` you currently selected.
    - [x] We will give you `station marker` with `number` on top, which map to the index of result list.
    - [x] When user `zoom-in` the `number` and `name` will show on top of `station marker`.
    - [x] You can navigate to `station arrival time` with click on `station marker`.
    - [x] We will give you `route path`.

  - Station List

    - [x] A tabs for changing `sub routes` between multiple `direction`.

    - Station information in every item will show:

      - [x] Station name
      - [x] Next arrival time
      - [x] Trip Status

    - [x] A toggle for changing `arrival time` between `remain` or `actual` time.
    - [x] When user click on `station` will change `map` current focus `marker`.

  - Route Information

    - [x] A tabs for navigate `section` in information page.

    - [x] Route name
    - [x] Departure and Destination
    - [x] Serve Location
    - [x] Payment
    - [x] Schedule
      - [x] Weekday
      - [x] Weekend
      - [x] Flexible Timetable
      - [x] Fixed Timetable

### Built With

#### Frontend

React based project with Typescript.

- Vite
- Tailwindcss
- React
- React Router
- Redux with RTK-Toolkit
- Leaflet
- Mapbox API
- Framer Motion
- date-fns
- ramda
- Vercel

#### Backend

Python with FastAPI Framework.

- Poetry
- FastAPI
- Google Geocoding
- Redis
- GCP CloudRun

## Getting Started

### Prerequisites

Please make sure you already have:

- [NodeJS](https://nodejs.org/)
- [Yarn](https://yarnpkg.com/)

### Installation

```bash
npm install
```

or using

```bash
yarn
```

## Develope

```bash
npm run dev
```

or using

```bash
yarn dev
```

which will open [https://localhost:3000](https://localhost:3000) for this project,

**NOTICE**
Because we using `Geolocation API`,
this feature is available only in secure contexts (HTTPS),
please make sure run on `https` for local development.

## Roadmap

See the [open issues](https://github.com/Rabbittee/F2E-Bus-Frontend/issues) for a list of proposed features (and known issues).

- [Top Feature Requests](https://github.com/Rabbittee/F2E-Bus-Frontend/issues?q=label%3Aenhancement+is%3Aopen+sort%3Areactions-%2B1-desc) (Add your votes using the 👍 reaction)
- [Top Bugs](https://github.com/Rabbittee/F2E-Bus-Frontend/issues?q=is%3Aissue+is%3Aopen+label%3Abug+sort%3Areactions-%2B1-desc) (Add your votes using the 👍 reaction)
- [Newest Bugs](https://github.com/Rabbittee/F2E-Bus-Frontend/issues?q=is%3Aopen+is%3Aissue+label%3Abug)

## Support

Reach out to the maintainer at one of the following places:

- [GitHub Discussions](https://github.com/Rabbittee/F2E-Bus-Frontend/discussions)
- Contact options listed on [this GitHub profile](https://github.com/kayac-chang)

## Project assistance

If you want to say **thank you** or/and support active development of Taiwan Bus Search:

- Add a [GitHub Star](https://github.com/Rabbittee/F2E-Bus-Frontend) to the project.
- Tweet about the Taiwan Bus Search.
- Write interesting articles about the project on [Dev.to](https://dev.to/), [Medium](https://medium.com/) or your personal blog.

Together, we can make Taiwan Bus Search **better**!

## Contributing

First off, thanks for taking the time to contribute! Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make will benefit everybody else and are **greatly appreciated**.

Please read [our contribution guidelines](docs/CONTRIBUTING.md), and thank you for being involved!

## Contributors

For a full list of all authors and contributors, see [the contributors page](https://github.com/Rabbittee/F2E-Bus-Frontend/contributors).

## Security

Taiwan Bus Search follows good practices of security, but 100% security cannot be assured.
Taiwan Bus Search is provided **"as is"** without any **warranty**. Use at your own risk.

_For more information and to report security issues, please refer to our [security documentation](docs/SECURITY.md)._

## License

This project is licensed under the **GNU General Public License v3**.

See [LICENSE](LICENSE) for more information.

## Acknowledgements

Thanks you very much, can't bring this project out without:

- [六角學院](https://www.hexschool.com/)
- [交通部運輸資料流通服務](https://tdx.transportdata.tw/)
