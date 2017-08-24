/*Copyright 2017 Timofey Rechkalov <ntsdk@yandex.ru>

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
   limitations under the License. */

"use strict";

((exports)=>{
  
    exports.data = {
      "name": "Микшерный пульт ролевой игры",
      "description": "Изначально микшерный пульт ролевой игры (оригинал The Mixing Desk of Larp, далее МПРИ) был разработан для решения трёх задач: повышение осведомлённости о спектре возможностей при создании РИ, помочь мастерам лучше понимать собственные решения при разработке игр, способствовать изучению словаря дизайна ролевых игр.\nОсновная идея стоящая за МПРИ это осознанное принятие решения о дизайне РИ. Понимание пространства доступных решений очень важно, так как оно даёт возможность выбора. Осознанность выбора даёт нам ответ на вопрос что мы берем в игру, а что нет.",
      "links": [
        {
          "name": "Сарё о западных играх: \"Mixing desk of larp\"",
          "body": "http://rovenion.livejournal.com/1138434.html"
        },
        {
          "name": "Англо-русский словарь ролевых терминов",
          "body": "http://rovenion.livejournal.com/1207987.html"
        }
      ],
      "sliders": [
        {
          "name": "Тип коммуникации",
          "top": "Вербальный",
          "bottom": "Невербальный",
          "value": 0
        },
        {
          "name": "Открытость",
          "top": "Прозрачность",
          "bottom": "Тайна",
          "value": 0
        },
        {
          "name": "Сценография",
          "top": "Полная реалистичность (360 градусов)",
          "bottom": "Символизм",
          "value": 0
        },
        {
          "name": "Ответственность за создание персонажа",
          "top": "Игрок",
          "bottom": "Мастер",
          "value": 0
        },
        {
          "name": "Ответственность за создание культуры",
          "top": "Игрок",
          "bottom": "Мастер",
          "value": 0
        },
        {
          "name": "Мотивация игроков",
          "top": "Соревнование",
          "bottom": "Сотрудничество",
          "value": 0
        },
        {
          "name": "Персонаж как маска (bleed-in)",
          "top": "Дистанцирование",
          "bottom": "Игра в себя",
          "value": 0
        },
        {
          "name": "Давление на игрока",
          "top": "Реальное",
          "bottom": "Изображаемое",
          "value": 0
        },
        {
          "name": "Соответствие сеттингу",
          "top": "Играбельность",
          "bottom": "Точность",
          "value": 0
        },
        {
          "name": "Игровая механика",
          "top": "Явная",
          "bottom": "Скрытая",
          "value": 0
        },
        {
          "name": "Представление темы",
          "top": "Симуляция",
          "bottom": "Абстракция",
          "value": 0
        },
        {
          "name": "Стиль управления игрой",
          "top": "Активный",
          "bottom": "Пассивный",
          "value": 0
        },
        {
          "name": "Ваш бегунок?",
          "top": "Максимум",
          "bottom": "Минимум",
          "value": 0
        }
      ]
    };

})(this['defaultModel']={});