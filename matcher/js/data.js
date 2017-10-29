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

/*
 */
'use strict';

(function(exports){

    var prepare = (en, ru, enList, ruList, dictName) => {
        exports[enList] = en.split('\n').map(R.trim);
        exports[ruList] = ru.split('\n').map(R.trim);
        exports[dictName] = R.zipObj(exports[enList],exports[ruList]);
    };

    var enContinents = `Asia
        Europe
        Africa
        Oceania
        North America
        South America
        Antarctica`;

    var ruContinents = `Азия
        Европа
        Африка
        Океания
        Северная Америка
        Южная Америка
        Антарктида`;

    var enCountries = `Afghanistan
Aland Islands
Albania
Algeria
American Samoa
Andorra
Angola
Anguilla
Antigua and Barbuda
Argentina
Armenia
Aruba
Australia
Austria
Azerbaijan
Bahamas
Bahrain
Bangladesh
Barbados
Belarus
Belgium
Belize
Benin
Bermuda
Bhutan
Bolivia (Plurinational State of)
Bonaire, Sint Eustatius and Saba
Bosnia and Herzegovina
Botswana
Brazil
British Indian Ocean Territory
Brunei Darussalam
Bulgaria
Burkina Faso
Burundi
Cabo Verde
Cambodia
Cameroon
Canada
Cayman Islands
Central African Republic
Chad
Chile
China
Christmas Island
Cocos (Keeling) Islands
Colombia
Comoros
Cook Islands
Costa Rica
Croatia
Cuba
Curaçao
Cyprus
Czech Republic
Côte d'Ivoire
Democratic Republic of the Congo
Denmark
Djibouti
Dominica
Dominican Republic
Ecuador
Egypt
El Salvador
Equatorial Guinea
Eritrea
Estonia
Ethiopia
Falkland Islands
Faroe Islands
Federated States of Micronesia
Fiji
Finland
Republic of Macedonia
France
French Guiana
French Polynesia
French Southern Territories
Gabon
Gambia
Georgia
Germany
Ghana
Gibraltar
Greece
Greenland
Grenada
Guadeloupe
Guam
Guatemala
Guernsey
Guinea
Guinea-Bissau
Guyana
Haiti
Holy See
Honduras
Hong Kong
Hungary
Iceland
India
Indonesia
Iran (Islamic Republic of)
Iraq
Ireland
Isle of Man
Israel
Italy
Jamaica
Japan
Jersey
Jordan
Kazakhstan
Kenya
Kiribati
Kuwait
Kyrgyzstan
Laos
Latvia
Lebanon
Lesotho
Liberia
Libya
Liechtenstein
Lithuania
Luxembourg
Macau
Madagascar
Malawi
Malaysia
Maldives
Mali
Malta
Marshall Islands
Martinique
Mauritania
Mauritius
Mayotte
Mexico
Moldova
Monaco
Mongolia
Montenegro
Montserrat
Morocco
Mozambique
Myanmar
Namibia
Nauru
Nepal
Netherlands
New Caledonia
New Zealand
Nicaragua
Niger
Nigeria
Niue
Norfolk Island
North Korea
Northern Mariana Islands
Norway
Oman
Pakistan
Palau
Panama
Papua New Guinea
Paraguay
Peru
Philippines
Pitcairn
Poland
Portugal
Puerto Rico
Qatar
Republic of the Congo
Romania
Russia
Rwanda
Réunion
Saint Barthélemy
Saint Helena, Ascension and Tristan da Cunha
Saint Kitts and Nevis
Saint Lucia
Saint Martin
Saint Pierre and Miquelon
Saint Vincent and the Grenadines
Samoa
San Marino
Sao Tome and Principe
Saudi Arabia
Senegal
Serbia
Seychelles
Sierra Leone
Singapore
Sint Maarten
Slovakia
Slovenia
Solomon Islands
Somalia
South Africa
South Georgia and the South Sandwich Islands
South Korea
South Sudan
Spain
Sri Lanka
State of Palestine
Sudan
Suriname
Svalbard and Jan Mayen
Swaziland
Sweden
Switzerland
Syrian Arab Republic
Taiwan
Tajikistan
Tanzania
Thailand
Timor-Leste
Togo
Tokelau
Tonga
Trinidad and Tobago
Tunisia
Turkey
Turkmenistan
Turks and Caicos Islands
Tuvalu
Uganda
Ukraine
United Arab Emirates
United Kingdom
United States Minor Outlying Islands
United States of America
Uruguay
Uzbekistan
Vanuatu
Venezuela (Bolivarian Republic of)
Vietnam
Virgin Islands (British)
Virgin Islands (U.S.)
Wallis and Futuna
Western Sahara
Yemen
Zambia
Zimbabwe`;

    var ruCountries = `Афганистан
Аландские острова
Албания
Алжир
Американское Самоа
Андорра
Ангола
Ангилья
Антигуа и Барбуда
Аргентина
Армения
Аруба
Австралия
Австрия
Азербайджан
Багамские острова
Бахрейн
Бангладеш
Барбадос
Беларусь
Бельгия
Белиз
Бенин
Бермуды
Бутан
Боливия (Многонациональное Государство)
Бонэйр, Синт-Эста́тиус и Са́ба (Кари́бские Нидерла́нды)
Босния и Герцеговина
Ботсвана
Бразилия
Британская территория в Индийском океане
Бруней-Даруссалам
Болгария
Буркина Фасо
Бурунди
Кабо Верде
Камбоджа
Камерун
Канада
Каймановы острова
Центральноафриканская Республика
Чад
Чили
Китай
остров Рождества
Кокосовые (Килинг) Острова
Колумбия
Коморские острова
Острова Кука
Коста Рика
Хорватия
Куба
Кюрасао
Кипр
Чешская Республика
Кот-д'Ивуар
Демократическая Республика Конго
Дания
Джибути
Доминика
Доминиканская Республика
Эквадор
Египет
Сальвадор
Экваториальная Гвинея
Эритрея
Эстония
Эфиопия
Фолклендские острова
Фарерские острова
Федеративные Штаты Микронезии
Фиджи
Финляндия
Республика Македония
Франция
Французская Гвиана
Французская Полинезия
ФЮАТ (Французские Южные и Антарктические территории)
Габон
Гамбия
Грузия
Германия
Гана
Гибралтар
Греция
Гренландия
Гренада
Гваделупа
ГУАМ
Гватемала
Ге́рнси
Гвинея
Гвинея Бисау
Гайана
Гаити
Святой Престол
Гондурас
Гонконг
Венгрия
Исландия
Индия
Индонезия
Иран (Исламская Республика)
Ирак
Ирландия
мэн
Израиль
Италия
Ямайка
Япония
Джерси
Иордания
Казахстан
Кения
Кирибати
Кувейт
Кыргызстан
Лаос
Латвия
Ливан
Лесото
Либерия
Ливия
Лихтенштейн
Литва
Люксембург
Макао
Мадагаскар
Малави
Малайзия
Мальдивы
Мали
Мальта
Маршалловы острова
Мартиника
Мавритания
Маврикий
Майотта
Мексика
Молдова
Монако
Монголия
Черногория
Монтсеррат
Марокко
Мозамбик
Мьянма
Намибия
Науру
Непал
Нидерланды
новая Каледония
новая Зеландия
Никарагуа
Нигер
Нигерия
Ниуэ
норфолк
Северная Корея
северные Марианские острова
Норвегия
Оман
Пакистан
Палау
Панама
Папуа новая Гвинея
Парагвай
Перу
Филиппины
Питкэрн
Польша
Португалия
Пуэрто Рико
Катар
Республика Конго
Румыния
Россия
Руанда
Реюньон
Сент-Бартелеми
Острова Святой Елены, Вознесения и Тристан-да-Кунья
Сент-Китс и Невис
Сент-Люсия
святой Мартин
Сен-Пьер и Микелон
Сент-Винсент и Гренадины
Самоа
Сан Марино
Сан-Томе и Принсипи
Саудовская Аравия
Сенегал
Сербия
Сейшельские острова
Сьерра Леоне
Сингапур
Синт-Мартен
Словакия
Словения
Соломоновы острова
Сомали
Южная Африка
Южная Георгия и Южные Сандвичевы острова
Южная Корея
Южный Судан
Испания
ШриЛанка
палестинское государство
Судан
Суринам
Шпицберген и Ян Майен
Свазиленд
Швеция
Швейцария
Сирийская Арабская Республика
Тайвань
Таджикистан
Танзания
Таиланд
восточный Тимор
Того
Токелау
Тонга
Тринидад и Тобаго
Тунис
Турция
Туркменистан
Острова Теркс и Кайкос
Тувалу
Уганда
Украина
Объединенные Арабские Эмираты
Великобритания
Внешние Малые Острова США
Соединенные Штаты Америки
Уругвай
Узбекистан
Вануату
Венесуэла (Боливарианская Республика)
Вьетнам
Виргинские острова (Британские)
Виргинские острова (США)
Уоллис и Футуна
Западная сахара
Йемен
Замбия
Зимбабве`;


    var enCapitals = `Kabul
Mariehamn
Tirana
Algiers
Pago Pago
Andorra la Vella
Luanda
The Valley
St. John's
Buenos Aires
Yerevan
Oranjestad
Canberra
Vienna
Baku
Nassau
Manama
Dhaka
Bridgetown
Minsk
Brussels
Belmopan
Porto-Novo
Hamilton
Thimphu
Sucre
Kralendijk
Sarajevo
Gaborone
Brasília
Diego Garcia
Bandar Seri Begawan
Sofia
Ouagadougou
Bujumbura
Praia
Phnom Penh
Yaoundé
Ottawa
George Town
Bangui
N'Djamena
Santiago
Beijing
Flying Fish Cove
West Island
Bogotá
Moroni
Avarua
San José
Zagreb
Havana
Willemstad
Nicosia
Prague
Yamoussoukro
Kinshasa
Copenhagen
Djibouti
Roseau
Santo Domingo
Quito
Cairo
San Salvador
Malabo
Asmara
Tallinn
Addis Ababa
Stanley
Tórshavn
Palikir
Suva
Helsinki
Skopje
Paris
Cayenne
Papeete
Saint-Pierre, Réunion
Libreville
Banjul
Tbilisi
Berlin
Accra
Gibraltar
Athens
Nuuk
St. George's
Basse-Terre
Hagåtña
Guatemala City
Saint Peter Port
Conakry
Bissau
Georgetown
Port-au-Prince
Vatican City
Tegucigalpa
Hong Kong
Budapest
Reykjavik
New Delhi
Jakarta
Tehran
Baghdad
Dublin
Douglas
Jerusalem
Rome
Kingston (Jamaica)
Tokyo
Saint Helier
Amman
Astana
Nairobi
South Tarawa
Kuwait City
Bishkek
Vientiane
Riga
Beirut
Maseru
Monrovia
Tripoli
Vaduz
Vilnius
Luxembourg City
Macau
Antananarivo
Lilongwe
Kuala Lumpur
Malé
Bamako
Valletta
Majuro
Fort-de-France
Nouakchott
Port Louis
Mamoudzou
Mexico City
Chișinău
Monaco
Ulaanbaatar
Podgorica
Little Bay, Brades, Plymouth
Rabat
Maputo
Naypyidaw
Windhoek
Yaren District
Kathmandu
Amsterdam
Nouméa
Wellington
Managua
Niamey
Abuja
Alofi
Kingston (Norfolk)
Pyongyang
Capitol Hill
Oslo
Muscat
Islamabad
Ngerulmud
Panama City
Port Moresby
Asunción
Lima
Manila
Adamstown
Warsaw
Lisbon
San Juan
Doha
Brazzaville
Bucharest
Moscow
Kigali
Saint-Denis
Gustavia
Jamestown
Basseterre
Castries
Marigot
Saint-Pierre
Kingstown
Apia
San Marino
São Tomé
Riyadh
Dakar
Belgrade
Victoria
Freetown
Singapore
Philipsburg
Bratislava
Ljubljana
Honiara
Mogadishu
Pretoria
King Edward Point
Seoul
Juba
Madrid
Sri Jayawardenepura Kotte, Colombo
Ramallah
Khartoum
Paramaribo
Longyearbyen
Lobamba, Mbabane
Stockholm
Bern
Damascus
Taipei
Dushanbe
Dodoma
Bangkok
Dili
Lomé
Nukunonu, Atafu,Tokelau
Nukuʻalofa
Port of Spain
Tunis
Ankara
Ashgabat
Cockburn Town
Funafuti
Kampala
Kiev
Abu Dhabi
London
Washington, D.C.
Washington, D.C.
Montevideo
Tashkent
Port Vila
Caracas
Hanoi
Road Town
Charlotte Amalie
Mata-Utu
Laayoune
Sana'a
Lusaka
Harare`;
    var ruCapitals = `Кабул
Мариехамн
Тирана
Алжир
Паго-Паго
Андорра-ла-Велла
Луанда
Валли
Сент-Джонс
Буэнос-Айрес
Ереван
Ораньестад
Канберра
Вена
Баку
Нассау
Манама
Дакка
Бриджтаун
Минск
Брюссель
Бельмопан
Порто-Ново
Гамильтон
Тхимпху
Сукре
Кралендейк
Сараево
Габороне
Бразилиа
Диего-Гарсия
Бандар-Сери-Бегаван
София
Уагадугу
Бужумбура
Прая
Пномпень
Яунде
Оттава
Джорджтаун
Банги
Нджамена
Сантьяго
Пекин
Флайинг-Фиш-Коув (Сеттлмент)
Уэ́ст-А́йленд
Богота
Морони
Аваруа
Сан-Хосе́
Загреб
Гавана
Виллемстад
Никосия
Прага
Ямусукро
Киншаса
Копенгаген
Джибути
Розо
Са́нто-Доми́нго
Кито
Каир
Сан-Сальвадор
Малабо
Асмэра
Таллинн
Аддис-Абеба
Стэнли
Торсхавн
Паликир
Сува
Хельсинки
Скопье
Париж
Кайенна
Папеэте
Сен-Пьер, Реюньон
Либревиль
Банджул
Тбилиси
Берлин
Аккра
Гибралтар
Афины
Нук
Сент-Джорджес
Бас-Тер
Хагатна
Гватемала
Сент-Питер-Порт
Конакри
Бисау
Джорджтаун
Порт-о-Пренс
Ватикан
Тегусигальпа
Гонконг
Будапешт
Рейкьявик
Дели
Джакарта
Тегеран
Багдад
Дублин
Дуглас
Иерусалим
Рим
Кингстон
Токио
Сент-Хелиер
Амман
Астана
Найроби
Южная Тарава
Эль-Куве́йт
Бишкек
Вьентьян
Рига
Бейрут
Масеру
Монровия
Триполи
Вадуц
Вильнюс
Люксембург
Макао
Антананариву
Лилонгве
Куа́ла-Лу́мпур
Мале
Бамако
Валлетта
Маджуро
Фор-де-Франс
Нуакшот
Порт-Луи
Мамудзу
Ме́хико
Кишинев
Монако
Ула́н-Ба́тор
Подгорица
Маленький залив, Брэдс, Плимут
Рабат
Мапуту
Нейпьидо
Виндхук
Ярен
Катманду
Амстердам
Нумеа
Веллингтон
Манагуа
Ниамей
Абуджа
Алофи
Кингстон
Пхеньян
Капитолийский Холм
Осло
Мускат
Исламабад
Нгеру́лмуд
Панама
Порт-Морсби
Асунсьон
Лима
Манила
Адамстаун
Варшава
Лиссабон
Сан Хуан
Доха
Браззавиль
Бухарест
Москва
Кигали
Сен-Дени
Густавия
Джеймстаун
Бастер
Кастри
Мариго
Сен-Пьер
Кингстаун
Апиа
Сан Марино
Сан-Томе
Рияд
Дакар
Белград
Виктория
Фритаун
Сингапур
Филипсбург
Братислава
Любляна
Хониара
Могадишо
Претория
Кинг Эдуард Пойнт
Сеул
Джуба
Мадрид
Шри-Джаяварденепура-Котте
Рамалла
Хартум
Парамарибо
Лонгйир
Лобамба, Мбабане
Стокгольм
Берн
Дамаск
Тайбэй
Душанбе
Додома
Бангкок
Дили
Лом
Нукунону, Атафу, Токелау
Нукуало́фа
Порт-оф-Спейн
Тунис
Анкара
Ашхабад
Коберн-Таун
Фунафути
Кампала
Киев
Абу-Даби
Лондон
Вашингтон
Вашингтон
Монтевидео
Ташкент
порт вила
Каракас
Ханой
Род-Таун
Шарлотта-амалия
Мата-Уту
Эль-аюне
Сана
Лусака
Хараре`;

    prepare(enContinents, ruContinents, 'enContinents', 'ruContinents', 'continentDict');
    prepare(enCountries, ruCountries, 'enCountries', 'ruCountries', 'countryDict');
    prepare(enCapitals, ruCapitals, 'enCapitals', 'ruCapitals', 'capitalDict');

    //Little Bay, Brades, Plymouth не найден
    //Ramallah не найден
    //Kathmandu не найден
    //Mata-Utu не найден
    //Mogadishu не найден
    //Nukuʻalofa не найден
    //Riyadh не найден






    var rawCapitalCoords = `["Abuja",1,[9.05115,7.521693]]
        ["Mogadishu",1,[2.043933, 45.354286]]
        ["Little Bay, Brades, Plymouth",1,[16.700596, -62.218987]]
        ["Ramallah",1,[31.906575, 35.207608]]
        ["Riyadh",1,[24.663022, 46.756367]]
        ["Nukuʻalofa",1,[-21.136345, -175.206218]]
        ["Kathmandu",1,[27.709164, 85.319614]]
        ["Mata-Utu",1,[-13.267484, -176.187473]]
    ["Accra",1,[5.634546,-0.171911]]
    ["Abu Dhabi",1,[24.434712, 54.408945]]
    ["Adamstown",1,[-25.068137, -130.102913]]
    ["Amman",1,[31.955397,35.895673]]
    ["Alofi",1,[-19.055835,-169.921411]]
    ["Addis Ababa",1,[8.982662,38.794419]]
    ["Amsterdam",1,[52.372518,4.896977]]
    ["Algiers",1,[28.230462, 2.690077]]
    ["Andorra la Vella",1,[42.50519,1.52401]]
    ["Antananarivo",1,[-18.901408,47.522172]]
    ["Ankara",1,[39.920874,32.853923]]
    ["Apia",1,[-13.832447,-171.765482]]
    ["Ashgabat",1,[37.935183,58.378977]]
    ["Asmara",1,[15.318824, 38.917183]]
    ["Astana",1,[51.128422,71.430564]]
    ["Athens",1,[37.971879,23.733238]]
    ["Asunción",1,[-25.298249,-57.622533]]
    ["Baku",1,[40.369147,49.834732]]
    ["Baghdad",1,[33.270461,44.416085]]
    ["Avarua",1,[-21.20607,-159.776539]]
    ["Bamako",1,[12.621268,-8.013161]]
    ["Bangkok",1,[13.758945,100.532646]]
    ["Bandar Seri Begawan",1,[4.929522,114.91851]]
    ["Banjul",1,[13.455483,-16.613667]]
    ["Basseterre",1,[17.295295,-62.726284]]
    ["Bangui",1,[4.380766,18.554469]]
    ["Basse-Terre",1,[16.006293,-61.730681]]
    ["Beirut",1,[33.835934,35.504438]]
    ["Beijing",1,[39.90396,116.391289]]
    ["Belmopan",1,[17.263431,-88.784937]]
    ["Belgrade",1,[44.806768,20.461682]]
    ["Bern",1,[46.946496,7.448309]]
    ["Berlin",1,[52.536087,13.435572]]
    ["Bishkek",1,[42.876366,74.60371]]
    ["Bissau",1,[11.87355,-15.608345]]
    ["Bogotá",1,[4.610147,-74.075608]]
    ["Bratislava",1,[48.148977,17.107247]]
    ["Brasília",1,[-15.802118,-47.889062]]
    ["Brazzaville",1,[-4.206088,15.242623]]
    ["Brussels",1,[50.854283,4.352131]]
    ["Budapest",1,[47.491618,19.051237]]
    ["Bucharest",1,[44.425868,26.103272]]
    ["Buenos Aires",1,[-34.60879,-58.391787]]
    ["Bujumbura",1,[-3.369835,29.372323]]
    ["Cairo",1,[30.068751,31.277515]]
    ["Canberra",1,[-35.274836,149.129859]]
    ["Caracas",1,[10.485846,-66.907196]]
    ["Capitol Hill",1,[15.233333, 145.75]]
    ["Castries",1,[14.009897,-60.988385]]
    ["Bridgetown",1,[13.097396,-59.606282]]
    ["Cayenne",1,[4.938297,-52.325787]]
    ["Chișinău",1,[47.024672,28.832336]]
    ["Charlotte Amalie",1,[18.344096,-64.936086]]
    ["Copenhagen",1,[55.709297,12.52654]]
    ["Conakry",1,[9.628353,-13.588564]]
    ["Cockburn Town",1,[21.470492,-71.142384]]
    ["Dakar",1,[14.781295,-17.282697]]
    ["Dhaka",1,[23.853571,90.396102]]
    ["Djibouti",1,[11.574183, 43.145257]]
    ["Dili",1,[-8.559437,125.560456]]
    ["Damascus",1,[33.516828,36.315357]]
    ["Diego Garcia",1,[37.271467,-6.838883]]
    ["Dodoma",1,[-6.145029,35.777535]]
    ["Dublin",1,[53.342925,-6.250047]]
    ["Doha",1,[25.29361,51.519181]]
    ["Douglas",1,[54.1504,-4.480186]]
    ["Flying Fish Cove",1,[-10.418099, 105.673843]]
    ["Dushanbe",1,[38.574699,68.780103]]
    ["Fort-de-France",1,[14.611399,-61.059882]]
    ["Freetown",1,[8.430298,-13.178088]]
    ["Gaborone",1,[-24.620187,25.893884]]
    ["Funafuti",1,[-8.513582,179.192295]]
    ["Georgetown",1,[6.8065,-58.147885]]
    ["George Town",1,[19.294205,-81.378732]]
    ["Gustavia",1,[17.906993,-62.850889]]
    ["Gibraltar",1,[36.14273,-5.355603]]
    ["Guatemala City",1,[14.610174,-90.53676]]
    ["Hagåtña",1,[13.476505,144.742398]]
    ["Hanoi",1,[21.030672, 105.846594]]
    ["Harare",1,[-17.831201,31.007813]]
    ["Hamilton",1,[-37.792093,175.287722]]
    ["Havana",1,[23.1066,-82.372385]]
    ["Helsinki",1,[60.165379,24.941077]]
    ["Hong Kong",1,[22.326371,114.179358]]
    ["Honiara",1,[-9.438266,159.961808]]
    ["Jakarta",1,[-6.149839,106.836421]]
    ["Islamabad",1,[33.663492,72.978451]]
    ["Jerusalem",1,[31.78951,35.209306]]
    ["Juba",1,[4.821251,31.563853]]
    ["Jamestown",1,[-15.958031,-5.742346]]
    ["Kabul",1,[34.515345,69.176134]]
    ["Kampala",1,[0.314466,32.578841]]
    ["Khartoum",1,[15.489579, 32.581527]]
    ["Kigali",1,[-1.949485,30.091703]]
    ["Kiev",1,[50.450412,30.523487]]
    ["Kingston (Jamaica)",1,[17.993292, -76.802489]]
    ["King Edward Point",1,[-37.069001,174.947216]]
    ["Kingston (Norfolk)",1,[-29.0754, 168.0213]]
    ["Kingstown",1,[13.154598,-61.229987]]
    ["Kinshasa",1,[-4.421332,15.361919]]
    ["Kralendijk",1,[12.152911,-68.273444]]
    ["Kuala Lumpur",1,[3.090646,101.66217]]
    ["Laayoune",1,[26.522921,-13.03583]]
    ["Kuwait City",1,[29.376087,47.981229]]
    ["Libreville",1,[0.411439,9.51677]]
    ["Lisbon",1,[38.716174,-9.141589]]
    ["Lilongwe",1,[-13.956719,33.749822]]
    ["Lima",1,[-12.056714,-77.011132]]
    ["Ljubljana",1,[46.058007,14.509858]]
    ["Lobamba, Mbabane",1,[-26.328833,31.155344]]
    ["London",1,[51.511118,-0.085708]]
    ["Longyearbyen",1,[78.207098,15.607132]]
    ["Lomé",1,[6.168189,1.243538]]
    ["Lusaka",1,[-15.39574,28.330061]]
    ["Luanda",1,[-8.814776,13.233064]]
    ["Luxembourg City",1,[49.610924,6.123986]]
    ["Majuro",1,[7.076047,171.326511]]
    ["Macau",1,[-5.11879,-36.627889]]
    ["Madrid",1,[40.419348,-3.700897]]
    ["Malé",1,[4.174972,73.509688]]
    ["Mamoudzou",1,[-12.778891,45.223123]]
    ["Malabo",1,[3.731845,8.755385]]
    ["Managua",1,[12.144833,-86.270292]]
    ["Manila",1,[14.596116,120.984195]]
    ["Maputo",1,[-25.874709,32.529568]]
    ["Marigot",1,[18.071265,-63.08155]]
    ["Manama",1,[26.222815,50.587439]]
    ["Mariehamn",1,[60.111939,19.942671]]
    ["Maseru",1,[-29.331701,27.489382]]
    ["Minsk",1,[53.902496,27.561481]]
    ["Mexico City",1,[19.385394,-99.035784]]
    ["Monaco",1,[43.737335,7.427657]]
    ["Monrovia",1,[6.336449,-10.738048]]
    ["Montevideo",1,[-34.871837,-56.196511]]
    ["Muscat",1,[23.226852,58.705389]]
    ["Moroni",1,[-11.727391,43.238996]]
    ["N'Djamena",1,[12.136516,15.078339]]
    ["Moscow",1,[55.755814,37.617635]]
    ["Nairobi",1,[-1.272758,36.827899]]
    ["Nassau",1,[25.046813,-77.323494]]
    ["Niamey",1,[13.524484,2.108651]]
    ["New Delhi",1,[28.643014,77.222685]]
    ["Ngerulmud",1,[7.501521,134.61189]]
    ["Naypyidaw",1,[19.745777,96.16731]]
    ["Nicosia",1,[35.169998,33.359468]]
    ["Nouakchott",1,[18.055438,-15.968704]]
    ["Nouméa",1,[-22.235485,166.4703]]
    ["Nuuk",1,[64.178596, -51.672703]]
    ["Oranjestad",1,[12.523109,-70.040646]]
    ["Nukunonu, Atafu,Tokelau",1,[-9.168983,-171.823774]]
    ["Oslo",1,[59.92051,10.770261]]
    ["Ottawa",1,[45.401795,-75.699583]]
    ["Ouagadougou",1,[12.358023,-1.520066]]
    ["Palikir",1,[6.962827,158.210848]]
    ["Pago Pago",1,[13.438979,144.76967]]
    ["Panama City",1,[8.95000, -79.53333]]
    ["Papeete",1,[-17.566348,-149.457699]]
    ["Paris",1,[48.856651,2.351691]]
    ["Paramaribo",1,[5.823395,-55.175782]]
    ["Philipsburg",1,[18.031479,-63.043955]]
    ["Phnom Penh",1,[11.552889,104.865913]]
    ["Port Louis",1,[-20.165111,57.499266]]
    ["Port Vila",1,[-17.730413,168.31976]]
    ["Podgorica",1,[42.437675,19.265072]]
    ["Port Moresby",1,[-9.436821,147.193334]]
    ["Port of Spain",1,[10.655398,-61.483384]]
    ["Port-au-Prince",1,[18.545758,-72.344142]]
    ["Porto-Novo",1,[6.475173,2.63219]]
    ["Pretoria",1,[-25.739818,28.220377]]
    ["Prague",1,[50.079623,14.424572]]
    ["Praia",1,[14.916059,-23.515648]]
    ["Pyongyang",1,[39.019699,125.752516]]
    ["Quito",1,[-0.219273,-78.509746]]
    ["Rabat",1,[33.96357,-6.843608]]
    ["Reykjavik",1,[64.146699,-21.961383]]
    ["Riga",1,[56.948048,24.107018]]
    ["Rome",1,[41.893917,12.507459]]
    ["Roseau",1,[15.296696,-61.398583]]
    ["Road Town",1,[18.414896,-64.625682]]
    ["Saint Helier",1,[49.18402,-2.102435]]
    ["Saint Peter Port",1,[49.4572,-2.539681]]
    ["Saint-Denis",1,[48.940729,2.367249]]
    ["Saint-Pierre, Réunion",1,[-21.309622,55.46813]]
    ["Saint-Pierre",1,[47.040039,-56.324764]]
    ["San Juan",1,[18.415753,-66.057884]]
    ["San José",1,[9.933725,-84.083478]]
    ["San Marino",1,[43.942514,12.460927]]
    ["San Salvador",1,[13.702715,-89.219614]]
    ["Santo Domingo",1,[18.497495,-69.88389]]
    ["Santiago",1,[-33.477669,-70.642364]]
    ["Sana'a",1,[15.370526,44.180475]]
    ["Sarajevo",1,[43.859796,18.411807]]
    ["Seoul",1,[37.572343,126.976892]]
    ["Singapore",1,[1.217442,103.795327]]
    ["Sofia",1,[42.684188,23.30476]]
    ["Skopje",1,[42.006476,21.438088]]
    ["Sri Jayawardenepura Kotte, Colombo",1,[7.015047,79.923731]]
    ["St. John's",1,[46.500939,29.850056]]
    ["South Tarawa",1,[1.3645,173.155796]]
    ["Stanley",1,[-51.715286,-57.884688]]
    ["St. George's",1,[12.053611, -61.750597]]
    ["Stockholm",1,[59.324927,18.071148]]
    ["Sucre",1,[-19.042227,-65.272056]]
    ["Suva",1,[-18.129664,178.435796]]
    ["Taipei",1,[25.071795,121.564237]]
    ["Tallinn",1,[59.437338,24.745235]]
    ["São Tomé",1,[0.323139,6.731705]]
    ["Tashkent",1,[41.311144,69.279728]]
    ["Tbilisi",1,[41.697048,44.799307]]
    ["Thimphu",1,[27.510571,89.63698]]
    ["Tehran",1,[35.661264,51.368264]]
    ["Tirana",1,[41.326396,19.818991]]
    ["Tegucigalpa",1,[14.079863,-87.216766]]
    ["The Valley",1,[18.242943,-63.064284]]
    ["Tokyo",1,[35.682418,139.753146]]
    ["Tunis",1,[33.872509,9.577406]]
    ["Tórshavn",1,[62.009577,-6.779217]]
    ["Tripoli",1,[32.740753,13.215493]]
    ["Ulaanbaatar",1,[47.918501,106.917602]]
    ["Vaduz",1,[47.139707,9.519582]]
    ["Valletta",1,[35.899399,14.513299]]
    ["Victoria",1,[-4.641524,55.460719]]
    ["Vatican City",1,[41.90383,12.453066]]
    ["Vientiane",1,[17.968903,102.612633]]
    ["Vilnius",1,[54.689383,25.270894]]
    ["Vienna",1,[48.208006,16.370404]]
    ["Warsaw",1,[52.230678,21.006699]]
    ["Wellington",1,[-41.297278,174.776069]]
    ["Washington, D.C.",1,[38.891896,-77.033788]]
    ["Washington, D.C.",1,[38.891896,-77.033788]]
    ["West Island",1,[-16.852386,122.126394]]
    ["Windhoek",1,[-22.559468,17.067038]]
    ["Willemstad",1,[12.109547,-68.934245]]
    ["Yaoundé",1,[3.814756,11.53126]]
    ["Yaren District",1,[-0.547207,166.922691]]
    ["Yamoussoukro",1,[6.809741,-5.250608]]
    ["Yerevan",1,[40.177642,44.512591]]
    ["Zagreb",1,[45.802814,15.974588]]`;

    exports.capitalCoords = R.indexBy(R.prop('name'), rawCapitalCoords.split('\n').map(JSON.parse).map(R.zipObj(['name','num','coords'])));
    //    console.log(exports.capitalCoords);

    var capitalsData = [
        {
            'alpha2': 'AF',
            'country': 'Afghanistan',
            'continent': 'Asia',
            'capital': 'Kabul'
        },
        {
            'alpha2': 'AX',
            'country': 'Aland Islands',
            'continent': 'Europe',
            'capital': 'Mariehamn'
        },
        {
            'alpha2': 'AL',
            'country': 'Albania',
            'continent': 'Europe',
            'capital': 'Tirana'
        },
        {
            'alpha2': 'DZ',
            'country': 'Algeria',
            'continent': 'Africa',
            'capital': 'Algiers'
        },
        {
            'alpha2': 'AS',
            'country': 'American Samoa',
            'continent': 'Oceania',
            'capital': 'Pago Pago'
        },
        {
            'alpha2': 'AD',
            'country': 'Andorra',
            'continent': 'Europe',
            'capital': 'Andorra la Vella'
        },
        {
            'alpha2': 'AO',
            'country': 'Angola',
            'continent': 'Africa',
            'capital': 'Luanda'
        },
        {
            'alpha2': 'AI',
            'country': 'Anguilla',
            'continent': 'North America',
            'capital': 'The Valley'
        },
        {
            'alpha2': 'AG',
            'country': 'Antigua and Barbuda',
            'continent': 'North America',
            'capital': 'St. John\'s'
        },
        {
            'alpha2': 'AR',
            'country': 'Argentina',
            'continent': 'South America',
            'capital': 'Buenos Aires'
        },
        {
            'alpha2': 'AM',
            'country': 'Armenia',
            'continent': 'Asia',
            'capital': 'Yerevan'
        },
        {
            'alpha2': 'AW',
            'country': 'Aruba',
            'continent': 'South America',
            'capital': 'Oranjestad'
        },
        {
            'alpha2': 'AU',
            'country': 'Australia',
            'continent': 'Oceania',
            'capital': 'Canberra'
        },
        {
            'alpha2': 'AT',
            'country': 'Austria',
            'continent': 'Europe',
            'capital': 'Vienna'
        },
        {
            'alpha2': 'AZ',
            'country': 'Azerbaijan',
            'continent': 'Asia',
            'capital': 'Baku'
        },
        {
            'alpha2': 'BS',
            'country': 'Bahamas',
            'continent': 'North America',
            'capital': 'Nassau'
        },
        {
            'alpha2': 'BH',
            'country': 'Bahrain',
            'continent': 'Asia',
            'capital': 'Manama'
        },
        {
            'alpha2': 'BD',
            'country': 'Bangladesh',
            'continent': 'Asia',
            'capital': 'Dhaka'
        },
        {
            'alpha2': 'BB',
            'country': 'Barbados',
            'continent': 'North America',
            'capital': 'Bridgetown'
        },
        {
            'alpha2': 'BY',
            'country': 'Belarus',
            'continent': 'Europe',
            'capital': 'Minsk'
        },
        {
            'alpha2': 'BE',
            'country': 'Belgium',
            'continent': 'Europe',
            'capital': 'Brussels'
        },
        {
            'alpha2': 'BZ',
            'country': 'Belize',
            'continent': 'North America',
            'capital': 'Belmopan'
        },
        {
            'alpha2': 'BJ',
            'country': 'Benin',
            'continent': 'Africa',
            'capital': 'Porto-Novo'
        },
        {
            'alpha2': 'BM',
            'country': 'Bermuda',
            'continent': 'North America',
            'capital': 'Hamilton'
        },
        {
            'alpha2': 'BT',
            'country': 'Bhutan',
            'continent': 'Asia',
            'capital': 'Thimphu'
        },
        {
            'alpha2': 'BO',
            'country': 'Bolivia (Plurinational State of)',
            'continent': 'South America',
            'capital': 'Sucre'
        },
        {
            'alpha2': 'BQ',
            'country': 'Bonaire, Sint Eustatius and Saba',
            'continent': 'South America',
            'capital': 'Kralendijk'
        },
        {
            'alpha2': 'BA',
            'country': 'Bosnia and Herzegovina',
            'continent': 'Europe',
            'capital': 'Sarajevo'
        },
        {
            'alpha2': 'BW',
            'country': 'Botswana',
            'continent': 'Africa',
            'capital': 'Gaborone'
        },
        {
            'alpha2': 'BR',
            'country': 'Brazil',
            'continent': 'South America',
            'capital': 'Brasília'
        },
        {
            'alpha2': 'IO',
            'country': 'British Indian Ocean Territory',
            'continent': 'Asia',
            'capital': 'Diego Garcia'
        },
        {
            'alpha2': 'BN',
            'country': 'Brunei Darussalam',
            'continent': 'Asia',
            'capital': 'Bandar Seri Begawan'
        },
        {
            'alpha2': 'BG',
            'country': 'Bulgaria',
            'continent': 'Europe',
            'capital': 'Sofia'
        },
        {
            'alpha2': 'BF',
            'country': 'Burkina Faso',
            'continent': 'Africa',
            'capital': 'Ouagadougou'
        },
        {
            'alpha2': 'BI',
            'country': 'Burundi',
            'continent': 'Africa',
            'capital': 'Bujumbura'
        },
        {
            'alpha2': 'CV',
            'country': 'Cabo Verde',
            'continent': 'Africa',
            'capital': 'Praia'
        },
        {
            'alpha2': 'KH',
            'country': 'Cambodia',
            'continent': 'Asia',
            'capital': 'Phnom Penh'
        },
        {
            'alpha2': 'CM',
            'country': 'Cameroon',
            'continent': 'Africa',
            'capital': 'Yaoundé'
        },
        {
            'alpha2': 'CA',
            'country': 'Canada',
            'continent': 'North America',
            'capital': 'Ottawa'
        },
        {
            'alpha2': 'KY',
            'country': 'Cayman Islands',
            'continent': 'North America',
            'capital': 'George Town'
        },
        {
            'alpha2': 'CF',
            'country': 'Central African Republic',
            'continent': 'Africa',
            'capital': 'Bangui'
        },
        {
            'alpha2': 'TD',
            'country': 'Chad',
            'continent': 'Africa',
            'capital': 'N\'Djamena'
        },
        {
            'alpha2': 'CL',
            'country': 'Chile',
            'continent': 'South America',
            'capital': 'Santiago'
        },
        {
            'alpha2': 'CN',
            'country': 'China',
            'continent': 'Asia',
            'capital': 'Beijing'
        },
        {
            'alpha2': 'CX',
            'country': 'Christmas Island',
            'continent': 'Asia',
            'capital': 'Flying Fish Cove'
        },
        {
            'alpha2': 'CC',
            'country': 'Cocos (Keeling) Islands',
            'continent': 'Asia',
            'capital': 'West Island'
        },
        {
            'alpha2': 'CO',
            'country': 'Colombia',
            'continent': 'South America',
            'capital': 'Bogotá'
        },
        {
            'alpha2': 'KM',
            'country': 'Comoros',
            'continent': 'Africa',
            'capital': 'Moroni'
        },
        {
            'alpha2': 'CK',
            'country': 'Cook Islands',
            'continent': 'Oceania',
            'capital': 'Avarua'
        },
        {
            'alpha2': 'CR',
            'country': 'Costa Rica',
            'continent': 'North America',
            'capital': 'San José'
        },
        {
            'alpha2': 'HR',
            'country': 'Croatia',
            'continent': 'Europe',
            'capital': 'Zagreb'
        },
        {
            'alpha2': 'CU',
            'country': 'Cuba',
            'continent': 'North America',
            'capital': 'Havana'
        },
        {
            'alpha2': 'CW',
            'country': 'Curaçao',
            'continent': 'South America',
            'capital': 'Willemstad'
        },
        {
            'alpha2': 'CY',
            'country': 'Cyprus',
            'continent': 'Europe',
            'capital': 'Nicosia'
        },
        {
            'alpha2': 'CZ',
            'country': 'Czech Republic',
            'continent': 'Europe',
            'capital': 'Prague'
        },
        {
            'alpha2': 'CI',
            'country': 'Côte d\'Ivoire',
            'continent': 'Africa',
            'capital': 'Yamoussoukro'
        },
        {
            'alpha2': 'CD',
            'country': 'Democratic Republic of the Congo',
            'continent': 'Africa',
            'capital': 'Kinshasa'
        },
        {
            'alpha2': 'DK',
            'country': 'Denmark',
            'continent': 'Europe',
            'capital': 'Copenhagen'
        },
        {
            'alpha2': 'DJ',
            'country': 'Djibouti',
            'continent': 'Africa',
            'capital': 'Djibouti'
        },
        {
            'alpha2': 'DM',
            'country': 'Dominica',
            'continent': 'North America',
            'capital': 'Roseau'
        },
        {
            'alpha2': 'DO',
            'country': 'Dominican Republic',
            'continent': 'North America',
            'capital': 'Santo Domingo'
        },
        {
            'alpha2': 'EC',
            'country': 'Ecuador',
            'continent': 'South America',
            'capital': 'Quito'
        },
        {
            'alpha2': 'EG',
            'country': 'Egypt',
            'continent': 'Africa',
            'capital': 'Cairo'
        },
        {
            'alpha2': 'SV',
            'country': 'El Salvador',
            'continent': 'North America',
            'capital': 'San Salvador'
        },
        {
            'alpha2': 'GQ',
            'country': 'Equatorial Guinea',
            'continent': 'Africa',
            'capital': 'Malabo'
        },
        {
            'alpha2': 'ER',
            'country': 'Eritrea',
            'continent': 'Africa',
            'capital': 'Asmara'
        },
        {
            'alpha2': 'EE',
            'country': 'Estonia',
            'continent': 'Europe',
            'capital': 'Tallinn'
        },
        {
            'alpha2': 'ET',
            'country': 'Ethiopia',
            'continent': 'Africa',
            'capital': 'Addis Ababa'
        },
        {
            'alpha2': 'FK',
            'country': 'Falkland Islands',
            'continent': 'South America',
            'capital': 'Stanley'
        },
        {
            'alpha2': 'FO',
            'country': 'Faroe Islands',
            'continent': 'Europe',
            'capital': 'Tórshavn'
        },
        {
            'alpha2': 'FM',
            'country': 'Federated States of Micronesia',
            'continent': 'Oceania',
            'capital': 'Palikir'
        },
        {
            'alpha2': 'FJ',
            'country': 'Fiji',
            'continent': 'Oceania',
            'capital': 'Suva'
        },
        {
            'alpha2': 'FI',
            'country': 'Finland',
            'continent': 'Europe',
            'capital': 'Helsinki'
        },
        {
            'alpha2': 'MK',
            'country': 'Republic of Macedonia',
            'continent': 'Europe',
            'capital': 'Skopje'
        },
        {
            'alpha2': 'FR',
            'country': 'France',
            'continent': 'Europe',
            'capital': 'Paris'
        },
        {
            'alpha2': 'GF',
            'country': 'French Guiana',
            'continent': 'South America',
            'capital': 'Cayenne'
        },
        {
            'alpha2': 'PF',
            'country': 'French Polynesia',
            'continent': 'Oceania',
            'capital': 'Papeete'
        },
        {
            'alpha2': 'TF',
            'country': 'French Southern Territories',
            'continent': 'Africa',
            'capital': 'Saint-Pierre, Réunion'
        },
        {
            'alpha2': 'GA',
            'country': 'Gabon',
            'continent': 'Africa',
            'capital': 'Libreville'
        },
        {
            'alpha2': 'GM',
            'country': 'Gambia',
            'continent': 'Africa',
            'capital': 'Banjul'
        },
        {
            'alpha2': 'GE',
            'country': 'Georgia',
            'continent': 'Asia',
            'capital': 'Tbilisi'
        },
        {
            'alpha2': 'DE',
            'country': 'Germany',
            'continent': 'Europe',
            'capital': 'Berlin'
        },
        {
            'alpha2': 'GH',
            'country': 'Ghana',
            'continent': 'Africa',
            'capital': 'Accra'
        },
        {
            'alpha2': 'GI',
            'country': 'Gibraltar',
            'continent': 'Europe',
            'capital': 'Gibraltar'
        },
        {
            'alpha2': 'GR',
            'country': 'Greece',
            'continent': 'Europe',
            'capital': 'Athens'
        },
        {
            'alpha2': 'GL',
            'country': 'Greenland',
            'continent': 'North America',
            'capital': 'Nuuk'
        },
        {
            'alpha2': 'GD',
            'country': 'Grenada',
            'continent': 'North America',
            'capital': 'St. George\'s'
        },
        {
            'alpha2': 'GP',
            'country': 'Guadeloupe',
            'continent': 'North America',
            'capital': 'Basse-Terre'
        },
        {
            'alpha2': 'GU',
            'country': 'Guam',
            'continent': 'Oceania',
            'capital': 'Hagåtña'
        },
        {
            'alpha2': 'GT',
            'country': 'Guatemala',
            'continent': 'North America',
            'capital': 'Guatemala City'
        },
        {
            'alpha2': 'GG',
            'country': 'Guernsey',
            'continent': 'Europe',
            'capital': 'Saint Peter Port'
        },
        {
            'alpha2': 'GN',
            'country': 'Guinea',
            'continent': 'Africa',
            'capital': 'Conakry'
        },
        {
            'alpha2': 'GW',
            'country': 'Guinea-Bissau',
            'continent': 'Africa',
            'capital': 'Bissau'
        },
        {
            'alpha2': 'GY',
            'country': 'Guyana',
            'continent': 'South America',
            'capital': 'Georgetown'
        },
        {
            'alpha2': 'HT',
            'country': 'Haiti',
            'continent': 'North America',
            'capital': 'Port-au-Prince'
        },
        {
            'alpha2': 'VA',
            'country': 'Holy See',
            'continent': 'Europe',
            'capital': 'Vatican City'
        },
        {
            'alpha2': 'HN',
            'country': 'Honduras',
            'continent': 'North America',
            'capital': 'Tegucigalpa'
        },
        {
            'alpha2': 'HK',
            'country': 'Hong Kong',
            'continent': 'Asia',
            'capital': 'Hong Kong'
        },
        {
            'alpha2': 'HU',
            'country': 'Hungary',
            'continent': 'Europe',
            'capital': 'Budapest'
        },
        {
            'alpha2': 'IS',
            'country': 'Iceland',
            'continent': 'Europe',
            'capital': 'Reykjavik'
        },
        {
            'alpha2': 'IN',
            'country': 'India',
            'continent': 'Asia',
            'capital': 'New Delhi'
        },
        {
            'alpha2': 'ID',
            'country': 'Indonesia',
            'continent': 'Asia',
            'capital': 'Jakarta'
        },
        {
            'alpha2': 'IR',
            'country': 'Iran (Islamic Republic of)',
            'continent': 'Asia',
            'capital': 'Tehran'
        },
        {
            'alpha2': 'IQ',
            'country': 'Iraq',
            'continent': 'Asia',
            'capital': 'Baghdad'
        },
        {
            'alpha2': 'IE',
            'country': 'Ireland',
            'continent': 'Europe',
            'capital': 'Dublin'
        },
        {
            'alpha2': 'IM',
            'country': 'Isle of Man',
            'continent': 'Europe',
            'capital': 'Douglas'
        },
        {
            'alpha2': 'IL',
            'country': 'Israel',
            'continent': 'Asia',
            'capital': 'Jerusalem'
        },
        {
            'alpha2': 'IT',
            'country': 'Italy',
            'continent': 'Europe',
            'capital': 'Rome'
        },
        {
            'alpha2': 'JM',
            'country': 'Jamaica',
            'continent': 'North America',
            'capital': 'Kingston (Jamaica)'
        },
        {
            'alpha2': 'JP',
            'country': 'Japan',
            'continent': 'Asia',
            'capital': 'Tokyo'
        },
        {
            'alpha2': 'JE',
            'country': 'Jersey',
            'continent': 'Europe',
            'capital': 'Saint Helier'
        },
        {
            'alpha2': 'JO',
            'country': 'Jordan',
            'continent': 'Asia',
            'capital': 'Amman'
        },
        {
            'alpha2': 'KZ',
            'country': 'Kazakhstan',
            'continent': 'Asia',
            'capital': 'Astana'
        },
        {
            'alpha2': 'KE',
            'country': 'Kenya',
            'continent': 'Africa',
            'capital': 'Nairobi'
        },
        {
            'alpha2': 'KI',
            'country': 'Kiribati',
            'continent': 'Oceania',
            'capital': 'South Tarawa'
        },
        {
            'alpha2': 'KW',
            'country': 'Kuwait',
            'continent': 'Asia',
            'capital': 'Kuwait City'
        },
        {
            'alpha2': 'KG',
            'country': 'Kyrgyzstan',
            'continent': 'Asia',
            'capital': 'Bishkek'
        },
        {
            'alpha2': 'LA',
            'country': 'Laos',
            'continent': 'Asia',
            'capital': 'Vientiane'
        },
        {
            'alpha2': 'LV',
            'country': 'Latvia',
            'continent': 'Europe',
            'capital': 'Riga'
        },
        {
            'alpha2': 'LB',
            'country': 'Lebanon',
            'continent': 'Asia',
            'capital': 'Beirut'
        },
        {
            'alpha2': 'LS',
            'country': 'Lesotho',
            'continent': 'Africa',
            'capital': 'Maseru'
        },
        {
            'alpha2': 'LR',
            'country': 'Liberia',
            'continent': 'Africa',
            'capital': 'Monrovia'
        },
        {
            'alpha2': 'LY',
            'country': 'Libya',
            'continent': 'Africa',
            'capital': 'Tripoli'
        },
        {
            'alpha2': 'LI',
            'country': 'Liechtenstein',
            'continent': 'Europe',
            'capital': 'Vaduz'
        },
        {
            'alpha2': 'LT',
            'country': 'Lithuania',
            'continent': 'Europe',
            'capital': 'Vilnius'
        },
        {
            'alpha2': 'LU',
            'country': 'Luxembourg',
            'continent': 'Europe',
            'capital': 'Luxembourg City'
        },
        {
            'alpha2': 'MO',
            'country': 'Macau',
            'continent': 'Asia',
            'capital': 'Macau'
        },
        {
            'alpha2': 'MG',
            'country': 'Madagascar',
            'continent': 'Africa',
            'capital': 'Antananarivo'
        },
        {
            'alpha2': 'MW',
            'country': 'Malawi',
            'continent': 'Africa',
            'capital': 'Lilongwe'
        },
        {
            'alpha2': 'MY',
            'country': 'Malaysia',
            'continent': 'Asia',
            'capital': 'Kuala Lumpur'
        },
        {
            'alpha2': 'MV',
            'country': 'Maldives',
            'continent': 'Asia',
            'capital': 'Malé'
        },
        {
            'alpha2': 'ML',
            'country': 'Mali',
            'continent': 'Africa',
            'capital': 'Bamako'
        },
        {
            'alpha2': 'MT',
            'country': 'Malta',
            'continent': 'Europe',
            'capital': 'Valletta'
        },
        {
            'alpha2': 'MH',
            'country': 'Marshall Islands',
            'continent': 'Oceania',
            'capital': 'Majuro'
        },
        {
            'alpha2': 'MQ',
            'country': 'Martinique',
            'continent': 'North America',
            'capital': 'Fort-de-France'
        },
        {
            'alpha2': 'MR',
            'country': 'Mauritania',
            'continent': 'Africa',
            'capital': 'Nouakchott'
        },
        {
            'alpha2': 'MU',
            'country': 'Mauritius',
            'continent': 'Africa',
            'capital': 'Port Louis'
        },
        {
            'alpha2': 'YT',
            'country': 'Mayotte',
            'continent': 'Africa',
            'capital': 'Mamoudzou'
        },
        {
            'alpha2': 'MX',
            'country': 'Mexico',
            'continent': 'North America',
            'capital': 'Mexico City'
        },
        {
            'alpha2': 'MD',
            'country': 'Moldova',
            'continent': 'Europe',
            'capital': 'Chișinău'
        },
        {
            'alpha2': 'MC',
            'country': 'Monaco',
            'continent': 'Europe',
            'capital': 'Monaco'
        },
        {
            'alpha2': 'MN',
            'country': 'Mongolia',
            'continent': 'Asia',
            'capital': 'Ulaanbaatar'
        },
        {
            'alpha2': 'ME',
            'country': 'Montenegro',
            'continent': 'Europe',
            'capital': 'Podgorica'
        },
        {
            'alpha2': 'MS',
            'country': 'Montserrat',
            'continent': 'North America',
            'capital': 'Little Bay, Brades, Plymouth'
        },
        {
            'alpha2': 'MA',
            'country': 'Morocco',
            'continent': 'Africa',
            'capital': 'Rabat'
        },
        {
            'alpha2': 'MZ',
            'country': 'Mozambique',
            'continent': 'Africa',
            'capital': 'Maputo'
        },
        {
            'alpha2': 'MM',
            'country': 'Myanmar',
            'continent': 'Asia',
            'capital': 'Naypyidaw'
        },
        {
            'alpha2': 'NA',
            'country': 'Namibia',
            'continent': 'Africa',
            'capital': 'Windhoek'
        },
        {
            'alpha2': 'NR',
            'country': 'Nauru',
            'continent': 'Oceania',
            'capital': 'Yaren District'
        },
        {
            'alpha2': 'NP',
            'country': 'Nepal',
            'continent': 'Asia',
            'capital': 'Kathmandu'
        },
        {
            'alpha2': 'NL',
            'country': 'Netherlands',
            'continent': 'Europe',
            'capital': 'Amsterdam'
        },
        {
            'alpha2': 'NC',
            'country': 'New Caledonia',
            'continent': 'Oceania',
            'capital': 'Nouméa'
        },
        {
            'alpha2': 'NZ',
            'country': 'New Zealand',
            'continent': 'Oceania',
            'capital': 'Wellington'
        },
        {
            'alpha2': 'NI',
            'country': 'Nicaragua',
            'continent': 'North America',
            'capital': 'Managua'
        },
        {
            'alpha2': 'NE',
            'country': 'Niger',
            'continent': 'Africa',
            'capital': 'Niamey'
        },
        {
            'alpha2': 'NG',
            'country': 'Nigeria',
            'continent': 'Africa',
            'capital': 'Abuja'
        },
        {
            'alpha2': 'NU',
            'country': 'Niue',
            'continent': 'Oceania',
            'capital': 'Alofi'
        },
        {
            'alpha2': 'NF',
            'country': 'Norfolk Island',
            'continent': 'Oceania',
            'capital': 'Kingston (Norfolk)'
        },
        {
            'alpha2': 'KP',
            'country': 'North Korea',
            'continent': 'Asia',
            'capital': 'Pyongyang'
        },
        {
            'alpha2': 'MP',
            'country': 'Northern Mariana Islands',
            'continent': 'Oceania',
            'capital': 'Capitol Hill'
        },
        {
            'alpha2': 'NO',
            'country': 'Norway',
            'continent': 'Europe',
            'capital': 'Oslo'
        },
        {
            'alpha2': 'OM',
            'country': 'Oman',
            'continent': 'Asia',
            'capital': 'Muscat'
        },
        {
            'alpha2': 'PK',
            'country': 'Pakistan',
            'continent': 'Asia',
            'capital': 'Islamabad'
        },
        {
            'alpha2': 'PW',
            'country': 'Palau',
            'continent': 'Oceania',
            'capital': 'Ngerulmud'
        },
        {
            'alpha2': 'PA',
            'country': 'Panama',
            'continent': 'North America',
            'capital': 'Panama City'
        },
        {
            'alpha2': 'PG',
            'country': 'Papua New Guinea',
            'continent': 'Oceania',
            'capital': 'Port Moresby'
        },
        {
            'alpha2': 'PY',
            'country': 'Paraguay',
            'continent': 'South America',
            'capital': 'Asunción'
        },
        {
            'alpha2': 'PE',
            'country': 'Peru',
            'continent': 'South America',
            'capital': 'Lima'
        },
        {
            'alpha2': 'PH',
            'country': 'Philippines',
            'continent': 'Asia',
            'capital': 'Manila'
        },
        {
            'alpha2': 'PN',
            'country': 'Pitcairn',
            'continent': 'Oceania',
            'capital': 'Adamstown'
        },
        {
            'alpha2': 'PL',
            'country': 'Poland',
            'continent': 'Europe',
            'capital': 'Warsaw'
        },
        {
            'alpha2': 'PT',
            'country': 'Portugal',
            'continent': 'Europe',
            'capital': 'Lisbon'
        },
        {
            'alpha2': 'PR',
            'country': 'Puerto Rico',
            'continent': 'North America',
            'capital': 'San Juan'
        },
        {
            'alpha2': 'QA',
            'country': 'Qatar',
            'continent': 'Asia',
            'capital': 'Doha'
        },
        {
            'alpha2': 'CG',
            'country': 'Republic of the Congo',
            'continent': 'Africa',
            'capital': 'Brazzaville'
        },
        {
            'alpha2': 'RO',
            'country': 'Romania',
            'continent': 'Europe',
            'capital': 'Bucharest'
        },
        {
            'alpha2': 'RU',
            'country': 'Russia',
            'continent': 'Europe',
            'capital': 'Moscow'
        },
        {
            'alpha2': 'RW',
            'country': 'Rwanda',
            'continent': 'Africa',
            'capital': 'Kigali'
        },
        {
            'alpha2': 'RE',
            'country': 'Réunion',
            'continent': 'Africa',
            'capital': 'Saint-Denis'
        },
        {
            'alpha2': 'BL',
            'country': 'Saint Barthélemy',
            'continent': 'North America',
            'capital': 'Gustavia'
        },
        {
            'alpha2': 'SH',
            'country': 'Saint Helena, Ascension and Tristan da Cunha',
            'continent': 'Africa',
            'capital': 'Jamestown'
        },
        {
            'alpha2': 'KN',
            'country': 'Saint Kitts and Nevis',
            'continent': 'North America',
            'capital': 'Basseterre'
        },
        {
            'alpha2': 'LC',
            'country': 'Saint Lucia',
            'continent': 'North America',
            'capital': 'Castries'
        },
        {
            'alpha2': 'MF',
            'country': 'Saint Martin',
            'continent': 'North America',
            'capital': 'Marigot'
        },
        {
            'alpha2': 'PM',
            'country': 'Saint Pierre and Miquelon',
            'continent': 'North America',
            'capital': 'Saint-Pierre'
        },
        {
            'alpha2': 'VC',
            'country': 'Saint Vincent and the Grenadines',
            'continent': 'North America',
            'capital': 'Kingstown'
        },
        {
            'alpha2': 'WS',
            'country': 'Samoa',
            'continent': 'Oceania',
            'capital': 'Apia'
        },
        {
            'alpha2': 'SM',
            'country': 'San Marino',
            'continent': 'Europe',
            'capital': 'San Marino'
        },
        {
            'alpha2': 'ST',
            'country': 'Sao Tome and Principe',
            'continent': 'Africa',
            'capital': 'São Tomé'
        },
        {
            'alpha2': 'SA',
            'country': 'Saudi Arabia',
            'continent': 'Asia',
            'capital': 'Riyadh'
        },
        {
            'alpha2': 'SN',
            'country': 'Senegal',
            'continent': 'Africa',
            'capital': 'Dakar'
        },
        {
            'alpha2': 'RS',
            'country': 'Serbia',
            'continent': 'Europe',
            'capital': 'Belgrade'
        },
        {
            'alpha2': 'SC',
            'country': 'Seychelles',
            'continent': 'Africa',
            'capital': 'Victoria'
        },
        {
            'alpha2': 'SL',
            'country': 'Sierra Leone',
            'continent': 'Africa',
            'capital': 'Freetown'
        },
        {
            'alpha2': 'SG',
            'country': 'Singapore',
            'continent': 'Asia',
            'capital': 'Singapore'
        },
        {
            'alpha2': 'SX',
            'country': 'Sint Maarten',
            'continent': 'North America',
            'capital': 'Philipsburg'
        },
        {
            'alpha2': 'SK',
            'country': 'Slovakia',
            'continent': 'Europe',
            'capital': 'Bratislava'
        },
        {
            'alpha2': 'SI',
            'country': 'Slovenia',
            'continent': 'Europe',
            'capital': 'Ljubljana'
        },
        {
            'alpha2': 'SB',
            'country': 'Solomon Islands',
            'continent': 'Oceania',
            'capital': 'Honiara'
        },
        {
            'alpha2': 'SO',
            'country': 'Somalia',
            'continent': 'Africa',
            'capital': 'Mogadishu'
        },
        {
            'alpha2': 'ZA',
            'country': 'South Africa',
            'continent': 'Africa',
            'capital': 'Pretoria'
        },
        {
            'alpha2': 'GS',
            'country': 'South Georgia and the South Sandwich Islands',
            'continent': 'Antarctica',
            'capital': 'King Edward Point'
        },
        {
            'alpha2': 'KR',
            'country': 'South Korea',
            'continent': 'Asia',
            'capital': 'Seoul'
        },
        {
            'alpha2': 'SS',
            'country': 'South Sudan',
            'continent': 'Africa',
            'capital': 'Juba'
        },
        {
            'alpha2': 'ES',
            'country': 'Spain',
            'continent': 'Europe',
            'capital': 'Madrid'
        },
        {
            'alpha2': 'LK',
            'country': 'Sri Lanka',
            'continent': 'Asia',
            'capital': 'Sri Jayawardenepura Kotte, Colombo'
        },
        {
            'alpha2': 'PS',
            'country': 'State of Palestine',
            'continent': 'Asia',
            'capital': 'Ramallah'
        },
        {
            'alpha2': 'SD',
            'country': 'Sudan',
            'continent': 'Africa',
            'capital': 'Khartoum'
        },
        {
            'alpha2': 'SR',
            'country': 'Suriname',
            'continent': 'South America',
            'capital': 'Paramaribo'
        },
        {
            'alpha2': 'SJ',
            'country': 'Svalbard and Jan Mayen',
            'continent': 'Europe',
            'capital': 'Longyearbyen'
        },
        {
            'alpha2': 'SZ',
            'country': 'Swaziland',
            'continent': 'Africa',
            'capital': 'Lobamba, Mbabane'
        },
        {
            'alpha2': 'SE',
            'country': 'Sweden',
            'continent': 'Europe',
            'capital': 'Stockholm'
        },
        {
            'alpha2': 'CH',
            'country': 'Switzerland',
            'continent': 'Europe',
            'capital': 'Bern'
        },
        {
            'alpha2': 'SY',
            'country': 'Syrian Arab Republic',
            'continent': 'Asia',
            'capital': 'Damascus'
        },
        {
            'alpha2': 'TW',
            'country': 'Taiwan',
            'continent': 'Asia',
            'capital': 'Taipei'
        },
        {
            'alpha2': 'TJ',
            'country': 'Tajikistan',
            'continent': 'Asia',
            'capital': 'Dushanbe'
        },
        {
            'alpha2': 'TZ',
            'country': 'Tanzania',
            'continent': 'Africa',
            'capital': 'Dodoma'
        },
        {
            'alpha2': 'TH',
            'country': 'Thailand',
            'continent': 'Asia',
            'capital': 'Bangkok'
        },
        {
            'alpha2': 'TL',
            'country': 'Timor-Leste',
            'continent': 'Asia',
            'capital': 'Dili'
        },
        {
            'alpha2': 'TG',
            'country': 'Togo',
            'continent': 'Africa',
            'capital': 'Lomé'
        },
        {
            'alpha2': 'TK',
            'country': 'Tokelau',
            'continent': 'Oceania',
            'capital': 'Nukunonu, Atafu,Tokelau'
        },
        {
            'alpha2': 'TO',
            'country': 'Tonga',
            'continent': 'Oceania',
            'capital': 'Nukuʻalofa'
        },
        {
            'alpha2': 'TT',
            'country': 'Trinidad and Tobago',
            'continent': 'South America',
            'capital': 'Port of Spain'
        },
        {
            'alpha2': 'TN',
            'country': 'Tunisia',
            'continent': 'Africa',
            'capital': 'Tunis'
        },
        {
            'alpha2': 'TR',
            'country': 'Turkey',
            'continent': 'Asia',
            'capital': 'Ankara'
        },
        {
            'alpha2': 'TM',
            'country': 'Turkmenistan',
            'continent': 'Asia',
            'capital': 'Ashgabat'
        },
        {
            'alpha2': 'TC',
            'country': 'Turks and Caicos Islands',
            'continent': 'North America',
            'capital': 'Cockburn Town'
        },
        {
            'alpha2': 'TV',
            'country': 'Tuvalu',
            'continent': 'Oceania',
            'capital': 'Funafuti'
        },
        {
            'alpha2': 'UG',
            'country': 'Uganda',
            'continent': 'Africa',
            'capital': 'Kampala'
        },
        {
            'alpha2': 'UA',
            'country': 'Ukraine',
            'continent': 'Europe',
            'capital': 'Kiev'
        },
        {
            'alpha2': 'AE',
            'country': 'United Arab Emirates',
            'continent': 'Asia',
            'capital': 'Abu Dhabi'
        },
        {
            'alpha2': 'GB',
            'country': 'United Kingdom',
            'continent': 'Europe',
            'capital': 'London'
        },
        {
            'alpha2': 'UM',
            'country': 'United States Minor Outlying Islands',
            'continent': 'North America',
            'capital': 'Washington, D.C.'
        },
        {
            'alpha2': 'US',
            'country': 'United States of America',
            'continent': 'North America',
            'capital': 'Washington, D.C.'
        },
        {
            'alpha2': 'UY',
            'country': 'Uruguay',
            'continent': 'South America',
            'capital': 'Montevideo'
        },
        {
            'alpha2': 'UZ',
            'country': 'Uzbekistan',
            'continent': 'Asia',
            'capital': 'Tashkent'
        },
        {
            'alpha2': 'VU',
            'country': 'Vanuatu',
            'continent': 'Oceania',
            'capital': 'Port Vila'
        },
        {
            'alpha2': 'VE',
            'country': 'Venezuela (Bolivarian Republic of)',
            'continent': 'South America',
            'capital': 'Caracas'
        },
        {
            'alpha2': 'VN',
            'country': 'Vietnam',
            'continent': 'Asia',
            'capital': 'Hanoi'
        },
        {
            'alpha2': 'VG',
            'country': 'Virgin Islands (British)',
            'continent': 'North America',
            'capital': 'Road Town'
        },
        {
            'alpha2': 'VI',
            'country': 'Virgin Islands (U.S.)',
            'continent': 'North America',
            'capital': 'Charlotte Amalie'
        },
        {
            'alpha2': 'WF',
            'country': 'Wallis and Futuna',
            'continent': 'Oceania',
            'capital': 'Mata-Utu'
        },
        {
            'alpha2': 'EH',
            'country': 'Western Sahara',
            'continent': 'Africa',
            'capital': 'Laayoune'
        },
        {
            'alpha2': 'YE',
            'country': 'Yemen',
            'continent': 'Asia',
            'capital': 'Sana\'a'
        },
        {
            'alpha2': 'ZM',
            'country': 'Zambia',
            'continent': 'Africa',
            'capital': 'Lusaka'
        },
        {
            'alpha2': 'ZW',
            'country': 'Zimbabwe',
            'continent': 'Africa',
            'capital': 'Harare'
        }
    ];

    //{
    //        "alpha2": "AF",
    //        "country": "Afghanistan",
    //        "continent": "Asia",
    //        "capital": "Kabul"
    //      },
    prepare(enContinents, ruContinents, 'enContinents', 'ruContinents', 'continentDict');
    prepare(enCountries, ruCountries, 'enCountries', 'ruCountries', 'countryDict');
    prepare(enCapitals, ruCapitals, 'enCapitals', 'ruCapitals', 'capitalDict');

    exports.capitals = capitalsData.filter(el => R.contains(el.capital, R.keys(exports.capitalCoords))).map(el => {
        return {
            alpha2: el.alpha2,
            country: exports.countryDict[el.country],
            continent: exports.continentDict[el.continent],
            name: exports.capitalDict[el.capital],
            enCountry: el.country,
            enContinent: el.continent,
            enName: el.capital,
            coords: exports.capitalCoords[el.capital].coords
        };
    });
    exports.capitals = R.indexBy(R.prop('name'),exports.capitals);

    var extraCountryList = `land Islands
American Samoa
Anguilla
Antigua and Barbuda
Aruba
Bonaire, Sint Eustatius and Saba
British Indian Ocean Territory
Christmas Island
Cocos (Keeling) Islands
Cook Islands
Curaçao
Dominica
Falkland Islands
Federated States of Micronesia
French Polynesia
French Southern Territories
Guam
Guernsey
Isle of Man
Norfolk Island
Jersey
Kiribati
Macau
Mayotte
Montserrat
Nauru
New Caledonia
Niue
Northern Mariana Islands
Palau
Pitcairn
Réunion
Saint Barthélemy
Saint Helena, Ascension and Tristan da Cunha
Saint Kitts and Nevis
Saint Lucia
Saint Martin
Saint Pierre and Miquelon
Saint Vincent and the Grenadines
Samoa
Sao Tome and Principe
Seychelles
Sint Maarten
Solomon Islands
South Georgia and the South Sandwich Islands
Svalbard and Jan Mayen
Tokelau
Tonga
Trinidad and Tobago
Turks and Caicos Islands
Tuvalu
Vanuatu
Virgin Islands (British)
Virgin Islands (U.S.)
Wallis and Futuna`;


    exports.extraCountryList = extraCountryList.split('\n').map(R.trim);
//    console.log(exports.capitals);

//    console.log(JSON.stringify(exports.capitals));
//    exports.continentDict = R.zipObj(enContinents,ruContinents);

//    console.log(enContinents);
//    console.log(ruContinents);
//    console.log(R.zipObj(enContinents,ruContinents));



})(typeof exports === 'undefined'? this['Data']={}: exports);
