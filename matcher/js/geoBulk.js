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

'use strict';

((exports)=>{
    
    var state = {};
    
    exports.init = () => {
        ymaps.ready(() => {
        
            UI.initPanelTogglers();

        
            queryEl('#coordsArea').value = '';
        
            simpleDataset();
            listen(queryEl('#simpleDataset'), 'click', simpleDataset);  
            listen(queryEl('#capitalsDataset'), 'click', capitalsDataset);  
            listen(queryEl('#capitalsDataset1'), 'click', capitalsDataset2(0));  
            listen(queryEl('#capitalsDataset2'), 'click', capitalsDataset2(1));  
            listen(queryEl('#capitalsDataset3'), 'click', capitalsDataset2(2));  
            listen(queryEl('#capitalsDataset4'), 'click', capitalsDataset2(3));  
            listen(queryEl('#capitalsDataset5'), 'click', capitalsDataset2(4));  
            listen(queryEl('#londonDataset'), 'click', londonDataset);  
            listen(queryEl('#findCityCoords'), 'click', findCityCoords);  
            state.map = new ymaps.Map ('map', {
                center: [55.76, 37.64], 
                zoom: 2
            });
        
            state.map.behaviors.enable('scrollZoom');
        
        });

    };
    
    var findCityCoords = () => {
        var cities = queryEl('#cityArea').value.trim();
        if(cities === ''){
            return;
        }
        cities = cities.split('\n').map(R.trim);
        var coordsArea = queryEl('#coordsArea');
        queryEl('#coordsArea').value = '';
        state.map.geoObjects.removeAll();
        
        var coordsLimit = Number(queryEl('.coordsLimit').value);
        
        cities.forEach(name => {
            var myGeocoder = ymaps.geocode(name, {kind:'locality', results:coordsLimit});
            myGeocoder.then(
                function (res) {
                    if(res.geoObjects.getLength() === 0){
                        coordsArea.value = coordsArea.value  + name + ' не найден ' + '\n';
                        return;
                    }
                    var total = res.geoObjects.getLength();
                    R.times(R.identity, res.geoObjects.getLength()).map(num => {
                        var printName = name + (total === 1 ? '' : '-' + (num+1)); 
                        
                        var coords =  res.geoObjects.get(num).geometry.getCoordinates();
                        // console.log(coords);
                        var arr = [name, num+1, coords];
                        coordsArea.value = coordsArea.value  + JSON.stringify(arr) + '\n';
                        
                        var myPlacemark = new ymaps.Placemark(coords, { 
                            balloonContent: JSON.stringify(arr),
                            iconContent: printName
                        }, {
                            preset: 'islands#greenStretchyIcon',
                        });
                        
                        state.map.geoObjects.add(myPlacemark);
                    });
                    
                    
                },
                function (err) {
                    alert('Ошибка');
                }
            );
        });
    };
    
    var simpleDataset = () => {
        queryEl('#cityArea').value = `Москва
Санкт-Петербург
Челябинск
Екатеринбург
Новосибирск`;
        //                    Лондон Великобритания
        //                    London
        //                    Лондон
    };
    
    var londonDataset = () => {
        queryEl('#cityArea').value = 'Лондон';
        //                    Лондон Великобритания
        //                    London
        //                    Лондон
    };
    
    var capitalsList = `Kabul
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
Kingston
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
Kingston
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
    
    capitalsList = capitalsList.split('\n').map(R.trim);
    capitalsList.sort();
    
    var capitalsDataset = () => {
        queryEl('#cityArea').value = capitalsList.join('\n');
    };
    
    var capitalsDataset2 = (num) => {
        return function() {
            queryEl('#cityArea').value = R.slice(num*50, (num+1)*50, capitalsList).join('\n');
        };
    };
    
})(this['app']={});