# rangeSlider

### [Превью плагина](https://wendivue.github.io/range-slider)

### Установка:
1. Клонируйте репозиторий
2. Установите необходимые зависимости проекта: `npm i`
---

### Основные команды: 
| Режим тестирования | Режим разработки | Режим продакшена |
| ------------------ | ---------------- | ---------------- |
| `npm run test`     | `npm run start`  | `npm run build`|

### Конфигурация
| Свойство    | Тип     | Default      | Описание                                                                       |
| ----------- | ------- | ------------ | ------------------------------------------------------------------------------ |
| `single`    | number  | 20           | Начальные значения для одного бегунка                                          |
| `from`      | number  | 20           | Начальные значения для первого бегунка                                         |
| `to`        | number  | 50           | Начальные значения для первого  бегунка                                        |
| `step`      | number  | 1            | Шаг(шаг >= 0.5)                                                                |
| `min`       | number  | 0            | Минимальное значение                                                           |
| `max`       | number  | 1000         | Максимальное значение                                                          |
| `type`      | string  | 'double'     | Позволяет выбрать одиночной значение или интервальное                          |
| `input`     | boolean | true         | Инпут, в котором синхронизировано значение слайдера                            |
| `range`     | boolean | true         | Инпуты для минимальное значение и максимальное значение                        |
| `label`     | boolean | true         | Показывать элемент над бегунком                                                |
| `vertical`  | boolean | false        | Вертикальное положение слайдера                                                |

### Инициализация слайдера<br/>
`<div id="slider" class="slider"></div>;`
- `$(sliderId).rangeSlider({}, sliderId)` - инициализация слайдера с настройками по умолчанию;
- `$(sliderId).rangeSlider({
  from: 100,
  to: 400,
  vetrical: true
}, sliderId)`

### Архитектура

### [UML диаграмма на сайте](https://viewer.diagrams.net/?highlight=0000ff&edit=_blank&layers=1&nav=1&title=Untitled%20Diagram(5).drawio#R7V1dd5u4Fv01XmvuQ7IQ2AYeGyf9uDeZ6TSZtnfeVKPY3GLkwaSO%2B%2Buv%2BJBtkDDYQQKnp6trtcgYDHvrnKN9dKSBNVk8v4vwcn5HPRIMTMN7HljXA9NEY9ti%2FyQtm6zFcYysYRb5Xn7SruHe%2F0nyRn7ak%2B%2BRVeHEmNIg9pfFxikNQzKNC204iui6eNojDYp3XeIZERrupzgQW7%2F4XjzPn8K0d%2B3viT%2Bb8zujsZt9ssD85PxJVnPs0fVek3UzsCYRpXH2v8XzhATJy%2BPv5cuHzZfg9vv43b%2F%2FXP2D%2F7r6z8Pvny%2Byi7095ivbR4hIGJ98aeou7ev4bztyVj9v0V%2Bf19FmemHm6P7AwVP%2Bwj5GZMXuQ6L8qeMNf5Wrtb8IcMiOrh5pGN%2FnnxjseDr3A%2B8Wb%2BhT8gNXMZ5%2B50dXcxr5P9n5OGAfIdbAPo7inCnmOLmaHwQTGtCINYQ0vcHuS%2FfJxfLbsJ%2FGvvaRvwhUarrDz4UTb%2FEq5j%2BQBgFervxv6U9OvrjA0cwPr2gc00V%2B0iqO6HfCf8nAtIz0D%2FukIQI5Uj9IFJPnPf7liLwjdEHiaMNOyT817Zxcee8aWfnxesdVNB5nbfM9nprj%2FESc94%2FZ9trb231i%2FQmHM%2FbE2%2FtZ5fuNxPu5hux2xbvhgBEkxDG5ok%2Bht9onHvvP3pPumlI6HkPNoUDNi%2BQ7oR%2F%2F9i%2BBm%2Bx9xwKCOZck9MKBPwvZYUAek68lgPnMZrzJm2O6TC62xFM%2FnN2m51wPdy2f8heTNFH23ccgtQtz3%2FNImLCPxjjG37a9Y0n9ME7f3OiK%2FWXvd2JcjgYj9sMn7Bjtjtnf5PQontCQPQv2U7oRxuM1SbgsIeLhfl3PxE0R4XriVfOuQIGj8R5V4s1exqM%2F%2B5x%2BAMC3DPzI7Br4sRT4b37ovcehF5CbH%2ByZV9Dp28fedjrGHo3kvT4B%2F0O4fIoBe1XYI2PYOfjVPf8TC1yg46sDv3mcqQx8Wwr%2BPDX5d%2FRpRa7pOgTwFYA%2F6jrWQyOnDvw79rYBfAXgO13He2jkVkT6zN%2F%2FEU7miekH6BUM8YzOwz2uWpSgjxLIAXqF0FtdB3umYQiwEm9GuIrI3sqczmiIg5tdK3vXT6FHvPxN7865pQmGqY73PxLHm1xNxE8xTcTDeLHVGrloa3Dh8U0iKu%2B4kra99ZOHSc9hbz7afE0OGGb54X%2F3P7t%2BLhxt8iMRukMK4Yo%2BRVNy4HVZXCvH0Ywc4gIX9JJ3eZAJEQlw7P8oyuIH1MOPCa13yiEyXPfS3fuTD9xyglmGW7xi9sPzi7SvDvL3s2dIPvtkLVAMNOvWNevRuKgho6FkLOFIRGTLcmpZd96atSXXrKcRYbd9xNOYRhtwb3XuzWpOyQPitYyByrybZUqBZxbwPfNFAHn7kMtka72Qi6nTHPKbgCzY4wLq7aMuE6y1oo7GomA9MK8SIz8n0%2B859A%2BbJQxjFMAv1aw14y9q1hn%2BC%2FaSoeerg16mWGuGXlSseddPdIsrHAHwCoCXqdWagRfV6n3gb%2FE3EqSzEwB%2FBfjLBGvN%2BIuC9T7%2BAL2qYZ1MsNYLvS0K1jn0OJh%2BJNGUPTMGzVoJ%2BjLNWjP6osqYj%2FEmlEYeTE1QouV0HujZopqTdXoG%2FP3cf4QAXwXuTudxni1KOlvcfydrgF4R9BbqOsSzRFUnL4WBfJLqfNKwmN5BkvTOdt5AIZ3Ekz6vN51UpTWlAUgyJ77aGv2KhmfUmHqHih602p0qSQl7Hnia9gGXFjtoBbxKSmJdGgBvH3BphYNWwKu0o2R2DOgHCqGXFzhoHVAMxfkgW%2FBBNVSFu7S2QS%2FuVUniQqdPC5yAAQoYIC1w0MsAeWlTNhPsPiZLwF0B7tLaBr24y6uaitmCtxFdAAcUDemkRQ56OSAvbko4AE5fFezSAge9sMvLmrKuDy5ftZLTedDHdcQS%2FuzQ95jTT8paYMCnlAOyDJJmDogJ4yzw32cBOAFFBJDmkTQTwDxoBB7WNFvTBOBXAL%2BlMfRzvcU%2FyzfBO%2Bvxp%2FnwdXLzx0309aJqshCHH4J%2BGaCNyVCN%2FLjr6I8rDnqrW3tSrDpsWqzK%2B3R7xaovAm0oemuPPOKnIM%2BuCpBC9r%2F17L%2FF68LzriyL47mMXsj%2Bn5T8N53i3Uzxbj3J%2FZsGEujXY4tydJ19yyaIT%2Bqor5d3e2WCTMPsAuazgQvxBG5P8JLMB3%2Bb1nX7ZAXuQr27QIZVtOCWLNs3lNnw1z5bzDSsszAlWxez9Tepg7m0tw5HT9TKPUG9DeLz8FSvseKUyLYje82qKuyN483eafmYrfpGpSU8hu5w%2F3K157Mf5pYonP2EVglti4L6vZ90z8zibsDeqre3jltiCjcydeZ2m4t9tfbWqVJ7siT%2FA1ksmTUApa9W3Nn28xfN25X6fFVyj1Ol82fYQym4Ethls3f1wi6q%2B%2Fuwg7SvCnnZNF69yFeVhmXIp0sAAPDtAy%2BdxKsVeWRXrviTQv8J1ixVBH3jkb066KsKsDLoYTaPKuhlE3j12ntxDl%2Fa0QWsYczZ%2BpjTRcUxoC2rCJWxgceHr3fIWbVyOuyJVW%2BGtl36fIaZrhh1clkBDJGOZINzoiWyX%2FtKxy7szne6JXJb2Z1PryWS79OVxcGTAK9gLSQFsHcueLliGHyFI%2FA9GnyPOTrR92wlk9frfCAMfoEVOr8wGPE5guB9dOLeufdBRmWaDVZcVod758kWhMT%2Bns38yDJsEH%2Bojz%2FGjl0IB8bSidm%2FZPiBkHxZWIg%2FmtijXec%2BowCEFxZCAKIV%2BO4jEFSV94ftPtRC34MgREz%2BZkFImvaFGERHDFKMCRxJudavKb8jJF9nCEKQZuZo3JiK%2FQlBDm9CA4tKqIK%2B%2ByBEsg505onSaYfgifR7ItcBT8TJCZ7oBebIOkNPVLmGNWyHpgH%2F7t2RLeL%2FIWSGhh1DZZ6%2BBDEqF3FCad6OopU79kFt3nEGyj7DdHFNZSakDdUA371nqinLhPo8Zdh3L9fW1GZChZ4q6HtQoldTnQklesqw775Gz6naYwVq9BRj33mRHnLEWel8JAozhbQNRIelgei4qVH4BaYKOaJ0D%2BpoY6PktLKjo2abVLEDDEwVUgp8DwafVbI4TBVSC30Pxp6i3MjjEJgs1FUYYrsNw5DXn6N1RUEUopDmFun81qdD7uHKGUjPqoK%2B%2BzjEFYVQ7oxgvlBXzsgdgjPi%2FBTFWnBGjS3StnefkzOqlGhhwpB6%2FHvgkbreHMk03MHeWvMXxqVh2IPDq82nRx9J5LOXQCLuSSoXu58myo4%2F5c35evfoaB9Tuxq9mZtP1YvRm6WNeRB3MfwS2QL7wlr07fkJu2PW2MftgKOCDbWbGPBtb7uizbE7D1h8IaESq5RuJGAi2XSwMrdCr7RxRdUmF8dBWPvC9%2BzySGKWedsLu7NbVkeMZt1ZuBCyzJortbRJBTJc%2BY3UcoVTox2u7O%2BnZRQ2PEGXRvLox%2Fuglv3JNoHeE6Ii02qLqWY5MYmaMbU9LsnmpbTBpSEbRBW5hHrBJb5gck%2B45I7clqhUnmw9HuqmkmwMVU2lXQDSjherhd5puk%2BbJuTLK3eeMfKy9edfgryeXWNrGeP2izH1cU1zv1Naum9cHjopp4xs3frXQJmmgxhNlEHlNRpPtzKloGe73JI2yhw3RDqCMiw4MQrRinHpjk9SX9qOVvgiCj2hU3mXPcdGp7Fpm2zgF9LtsjiZVdgf1y1yybKsXnDJ7DWX7PL2p0255JRHY%2BULKeeSLJP98jFUafPRdvcebTDo7hdd0LBkMkan8gUNy5G3bk9mtSrgHAd8X%2BF03ZPhrCOGcjiP01CO8iWGUTIDjtsLGaVvcW57dBqV9vZxdQ%2BNeMKkfTpdSPjkmr0ITjhcfeWTEKCezCen4Y7Z7fFJmTqT8mlY5JONxn3gk9OvgZPAJ9s4ceSEhqWJVHZrKQN2GFEa758e4eX8jnokOeP%2F)

![](https://wendivue.github.io/range-slider/uml.png)