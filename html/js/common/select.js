define([
    // libs
    'jQuery',
    'Handlebars',
    'common/map',
    'common/api',
    'lib/text!templates/storelocator.html',
    'lib/text!templates/starshop.html'
], function($, Handlebars, map, api, storelocatorTpl, starshopTpl) {
    var dBody = $('body');

    var homeSelect = function (dHome) {
        var oAddress = map.getAddress(),
            dProvince = $('#province'),
            dCity = $('#city'),
            dProvinceSelect = dProvince.find('select'),
            dCitySelect = dCity.find('select'),
            dProvinceText = dProvince.find('.store_sl_txt'),
            dCityText = dCity.find('.store_sl_txt'),
            updateText = function () {
                setTimeout(function () {
                    var sProvince = dProvinceSelect.find('option:selected').text(),
                        sCity = dCitySelect.find('option:selected').text();

                    dProvinceText.html(sProvince);
                    dCityText.html(sCity);

                    // when province changed, should update the map center and markers
                    map.getLatLng(sCity, function (oLatLng) {
                        map.updateMapCenter(oLatLng);
                        map.updateMarkers(oLatLng);
                    })
                }, 100)
            };

        dHome.ChinaCitySelect({
            'prov' : dProvinceSelect,
            'city' : dCitySelect,
            'url' : 'data/city.json'
        })

        dProvinceSelect.change(function () {
            updateText();
        })

        dCitySelect.change(function () {
            updateText();
        })

        // the callback hell is caused with browse need sometime to render those options
        setTimeout(function () {
            var dProvinceOptions = dProvinceSelect.find('option'),
                nProvince = dProvinceOptions.length;

             // update choosed option
            dProvinceOptions.each(function(index, item){
                if ($(this).text().indexOf(oAddress.province) >= 0) {
                    $(this).prop('selected', true);
                }

                if (index == nProvince - 1) {
                    setTimeout(function () {
                        var dCityOptions = dCitySelect.find('option'),
                            nCity = dCityOptions.length;

                        dCityOptions.each(function(){
                            if ($(this).text().indexOf(oAddress.city) >= 0) {
                                $(this).prop('selected', true);
                            }
                        })

                        // update the ui
                        dProvinceSelect.change();
                        dCitySelect.change();
                    }, 30)
                }
            })
        }, 300)
    }

    var starshopSelect = function (dStarshop) {
        var oAddress = map.getAddress(),
            dBtn = $('.page_starshop .searchbtn'),
            dStores = $('.page_starshop .stores'),
            dCountry = $('#country'),
            dProvince = $('#province'),
            dCity = $('#city'),
            dCountrySelect = dCountry.find('select'),
            dProvinceSelect = dProvince.find('select'),
            dCitySelect = dCity.find('select'),
            dProvinceText = dProvince.find('.store_sl_txt'),
            dCityText = dCity.find('.store_sl_txt'),
            sProvince,
            sCity
            updateText = function () {
                setTimeout(function () {
                    sProvince = dProvinceSelect.find('option:selected').text();
                    sCity = dCitySelect.find('option:selected').text();

                    dProvinceText.html(sProvince);
                    dCityText.html(sCity);
                }, 100)
            };

        dStarshop.ChinaCitySelect({
            'prov' : dProvinceSelect,
            'city' : dCitySelect,
            'url' : 'data/city.json'
        })

        dProvinceSelect.change(function () {
            updateText();
        })

        dCitySelect.change(function () {
            updateText();
        })

        // when click the search button, should the tpl
        dBtn.bind('click', function () {
            api.getStarshop({
                path : 'xxx',
                method : 'get',
                data : {
                    province : sProvince,
                    city : sCity
                },
                success : function (aData) {
                    var nSize = aData.length;

                    // need do some trik for display order
                    for (var i = 0; i < nSize; i++) {
                        if (i % 2) {
                            aData[i].contentClass = 'right';
                            aData[i].imageClass = 'left';
                        } else {
                            aData[i].contentClass = 'left';
                            aData[i].imageClass = 'right';
                        }

                        if (i == (nSize - 1)) {
                            // update page store tpl
                            var str = Handlebars.compile(starshopTpl)({
                                data : aData
                            });

                            dStores.html(str);
                        }
                    }
                }
            })
        })

        // the callback hell is caused with browse need sometime to render those options
        setTimeout(function () {
            var dProvinceOptions = dProvinceSelect.find('option'),
                nProvince = dProvinceOptions.length;

            // update choosed option
            dProvinceOptions.each(function(index, item){
                if ($(this).text().indexOf(oAddress.province) >= 0) {
                    $(this).prop('selected', true);
                }

                if (index == nProvince - 1) {
                    setTimeout(function () {
                        var dCityOptions = dCitySelect.find('option'),
                            nCity = dCityOptions.length;

                        dCityOptions.each(function(){
                            if ($(this).text().indexOf(oAddress.city) >= 0) {
                                $(this).prop('selected', true);
                            }
                        })

                        // update the ui
                        dProvinceSelect.change();
                        dCitySelect.change();
                    }, 30)
                }
            })
        }, 300)
    }

    var storelocatorSelect = function (dStorelocator) {
        var oAddress = map.getAddress(),
            dMap = $('#map'),
            dStores = $('.page_storelocator .stores'),
            dCountry = $('#country'),
            dProvince = $('#province'),
            dCity = $('#city'),
            dDistrict = $('#district'),
            dCountrySelect = dCountry.find('select'),
            dProvinceSelect = dProvince.find('select'),
            dCitySelect = dCity.find('select'),
            dDistrictSelect = dDistrict.find('select'),
            dProvinceText = dProvince.find('.store_sl_txt'),
            dCityText = dCity.find('.store_sl_txt'),
            dDistrictText = dDistrict.find('.store_sl_txt'),
            dBtn = $('.page_storelocator .searchbtn'),
            sProvince,
            sCity,
            sDistrict,
            updateText = function () {
                setTimeout(function () {
                    sProvince = dProvinceSelect.find('option:selected').text();
                    sCity = dCitySelect.find('option:selected').text();
                    sDistrict = dDistrictSelect.find('option:selected').text();

                    dProvinceText.html(sProvince);
                    dCityText.html(sCity);
                    dDistrictText.html(sDistrict);
                }, 100)
            };

        oHandler = dStorelocator.ChinaCitySelect({
            'prov' : dProvinceSelect,
            'city' : dCitySelect,
            'dist' : dDistrictSelect,
            'url' : 'data/city.json'
        })

        dProvinceSelect.change(function () {
            updateText();
        })

        dCitySelect.change(function () {
            updateText();
        })

        dDistrictSelect.change(function () {
            updateText();
        })

        // when click the search button, should update the map center and markers
        dBtn.bind('click', function () {
            map.getLatLng(sCity, function (oLatLng) {
                map.updateMapCenter(oLatLng);
                map.updateMarkers(oLatLng, function (aData) {
                    // update page store tpl
                    var str = Handlebars.compile(storelocatorTpl)({
                        title : aData[0].title,
                        data : aData
                    });

                    dStores.html(str);
                })
            })
        })

        // view map feature
        dStores.delegate('.store_additem .store_view', 'click', function () {
            var oLatLng = {
                latitude : $(this).attr('latitude'),
                longitude : $(this).attr('longitude')
            }

            // scroll to the map
            dBody.scrollTop(dMap.position().top);

            // update map center
            map.updateMapCenter(oLatLng);
        })

        // the callback hell is caused with browse need sometime to render those options
        setTimeout(function () {
            var dProvinceOptions = dProvinceSelect.find('option'),
                nProvince = dProvinceOptions.length;

            // update choosed option
            dProvinceOptions.each(function(index, item){
                if ($(this).text().indexOf(oAddress.province) >= 0) {
                    $(this).prop('selected', true);
                }

                if (index == nProvince - 1) {
                    setTimeout(function () {
                        var dCityOptions = dCitySelect.find('option'),
                            nCity = dCityOptions.length;

                        dCityOptions.each(function(index){
                            if ($(this).text().indexOf(oAddress.city) >= 0) {
                                $(this).prop('selected', true);
                            }

                            if (index == nCity - 1) {
                                setTimeout(function () {
                                    var dDistrictOptions=dDistrictSelect.find('option'),
                                        nDistict = dDistrictOptions.length;

                                    dDistrictOptions.each(function(index){
                                        if ($(this).text().indexOf(oAddress.district) >= 0) {
                                            $(this).prop('selected', true);
                                        }
                                    })

                                    // update the ui
                                    dProvinceSelect.change();
                                    dCitySelect.change();
                                    dDistrictSelect.change();
                                }, 30)
                            }
                        })
                    }, 30)
                }
            })
        }, 300)
    }

    // enable the select
    var init = function () {
        var dHome = $('.index #home-selectbox'),
            dStarshop = $('.starshop #store-selectbox'),
            dStorelocator = $('.storelocator #store-selectbox');

        // home page, the city select is display none, we need it
        if (dHome.length) {
            homeSelect(dHome);
        }

        // starshop page
        if (dStarshop.length) {
            starshopSelect(dStarshop);
        }

        // storelocator page
        if (dStorelocator.length) {
            storelocatorSelect(dStorelocator);
        }
    }

    return {
        init : init
    }
})