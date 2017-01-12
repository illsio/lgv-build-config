/**
 * Server config
 */
"use strict";

module.exports = {
    test: {
        options: {
            port: 8001,
            keepalive: true,
            middleware: function (connect, options) {
            if (!Array.isArray(options.base)) {
                options.base = [options.base];
            }

            // Setup the proxy
            var middlewares = [require("grunt-connect-proxy/lib/utils").proxyRequest];

            // Serve static files.
            options.base.forEach(function (base) {
                middlewares.push(connect.static(base));
            });

            // Make directory browse-able.
            var directory = options.directory || options.base[options.base.length - 1];

            middlewares.push(connect.directory(directory));

            return middlewares;
        }

        }
    },

    server: {
        options: {
            port: 9001,
            open: {
                target: "http://localhost:9001/"
            },
            // keepalive: true,
            livereload: true,
            middleware: function (connect, options) {
                        if (!Array.isArray(options.base)) {
                            options.base = [options.base];
                        }

                        // Setup the proxy
                        var middlewares = [require("grunt-connect-proxy/lib/utils").proxyRequest];

                        // Serve static files.
                        options.base.forEach(function (base) {
                            middlewares.push(connect.static(base));
                        });

                        // Make directory browse-able.
                        var directory = options.directory || options.base[options.base.length - 1];

                        middlewares.push(connect.directory(directory));

                        return middlewares;
                    }
        },
        proxies: [
        //----------ELASTIC----------------
                {
                   context: "/gv-srv-w00130",
                   host: "gv-srv-w00130",
                   rewrite: {
                    "^/gv-srv-w00130": ""
                    }
                },
        // -----------------MRH----------------------------
                {
                   context: "/geodaten_metropolregion_hamburg_de",
                   host: "wfalgqw001",
                   port: 80,
                   https: false,
                   changeOrigin: false,
                   xforward: false
                },
                {
                   context: "/87_106_16_168",
                   host: "wfalgqw001",
                   port: 80,
                   https: false,
                   changeOrigin: false,
                   xforward: false
                },
                {
                   context: "/geodienste-hamburg_de",
                   host: "wfalgqw001",
                   port: 80,
                   https: false,
                   changeOrigin: false,
                   xforward: false
                },
                {
                   context: "/geodienste_hamburg_de",
                   host: "wfalgqw001",
                   port: 80,
                   https: false,
                   changeOrigin: false,
                   xforward: false
                },
                {
                   context: "/geoportal_kreis-lup_de",
                   host: "wfalgqw001",
                   port: 80,
                   https: false,
                   changeOrigin: false,
                   xforward: false
                },
                {
                   context: "/www_geocms_com",
                   host: "wfalgqw001",
                   port: 80,
                   https: false,
                   changeOrigin: false,
                   xforward: false
                },
                {
                   context: "/www_geoport-nwm_de",
                   host: "wfalgqw001",
                   port: 80,
                   https: false,
                   changeOrigin: false,
                   xforward: false
                },
                {
                   context: "/213_252_154_69",
                   host: "wfalgqw001",
                   port: 80,
                   https: false,
                   changeOrigin: false,
                   xforward: false
                },
                {
                   context: "/geo_lklg_net",
                   host: "wfalgqw001",
                   port: 80,
                   https: false,
                   changeOrigin: false,
                   xforward: false
                },
                {
                   context: "/gis_herzogtum-lauenburg_de",
                   host: "wfalgqw001",
                   port: 80,
                   https: false,
                   changeOrigin: false,
                   xforward: false
                },
                {
                   context: "/www2_heidekreis_de",
                   host: "wfalgqw001",
                   port: 80,
                   https: false,
                   changeOrigin: false,
                   xforward: false
                },
                {
                   context: "/ags_hannit_de",
                   host: "wfalgqw001",
                   port: 80,
                   https: false,
                   changeOrigin: false,
                   xforward: false
                },
                {
                   context: "/www_cuxland-gis_landkreis-cuxhaven_de",
                   host: "wfalgqw001",
                   port: 80,
                   https: false,
                   changeOrigin: false,
                   xforward: false
                },
                {
                   context: "/sla_niedersachsen_de",
                   host: "wfalgqw001",
                   port: 80,
                   https: false,
                   changeOrigin: false,
                   xforward: false
                },
                {
                   context: "/service_schleswig-holstein_de",
                   host: "wfalgqw001",
                   port: 80,
                   https: false,
                   changeOrigin: false,
                   xforward: false
                },
                {
                   context: "/www_umweltkarten_mv-regierung_de",
                   host: "wfalgqw001",
                   port: 80,
                   https: false,
                   changeOrigin: false,
                   xforward: false
                },
                {
                   context: "/maps_dwd_de",
                   host: "wfalgqw001",
                   port: 80,
                   https: false,
                   changeOrigin: false,
                   xforward: false
                },
                {
                   context: "/178_63_99_250",
                   host: "wfalgqw001",
                   port: 80,
                   https: false,
                   changeOrigin: false,
                   xforward: false
                },
                {
                   context: "/www_thru_de",
                   host: "wfalgqw001",
                   port: 80,
                   https: false,
                   changeOrigin: false,
                   xforward: false
                },
                {
                   context: "/extmap_hbt_de",
                   host: "wfalgqw001",
                   port: 80,
                   https: false,
                   changeOrigin: false,
                   xforward: false
                },
                {
                   context: "/www_geodok_de",
                   host: "wfalgqw001",
                   port: 80,
                   https: false,
                   changeOrigin: false,
                   xforward: false
                },
                {
                   context: "/141_88_214_10",
                   host: "wfalgqw001",
                   port: 80,
                   https: false,
                   changeOrigin: false,
                   xforward: false
                },
                {
                   context: "/www_pegelonline_wsv_de",
                   host: "wfalgqw001",
                   port: 80,
                   https: false,
                   changeOrigin: false,
                   xforward: false
                },
                {
                   context: "/ows_terrestris_de",
                   host: "wfalgqw001",
                   port: 80,
                   https: false,
                   changeOrigin: false,
                   xforward: false
                },
                {
                   context: "/www_wms_nrw_de",
                   host: "wfalgqw001",
                   port: 80,
                   https: false,
                   changeOrigin: false,
                   xforward: false
                },

        // -----------------FHH-Net------------------------
                {
                   context: "/lgvfds03_fhhnet_stadt_hamburg_de",
                   host: "lgvfds03.fhhnet.stadt.hamburg.de",
                   port: 80,
                   https: false,
                   changeOrigin: false,
                   xforward: false,
                   rewrite: {
                       "^/lgvfds03_fhhnet_stadt_hamburg_de": ""
                   }
                },
                {
                   context: "/lgvfds02_fhhnet_stadt_hamburg_de",
                   host: "lgvfds02.fhhnet.stadt.hamburg.de",
                   port: 80,
                   https: false,
                   changeOrigin: false,
                   xforward: false,
                   rewrite: {
                       "^/lgvfds02_fhhnet_stadt_hamburg_de": ""
                   }
                },
                {
                   context: "/lgvfds01_fhhnet_stadt_hamburg_de",
                   host: "lgvfds01.fhhnet.stadt.hamburg.de",
                   port: 80,
                   https: false,
                   changeOrigin: false,
                   xforward: false,
                   rewrite: {
                       "^/lgvfds01_fhhnet_stadt_hamburg_de": ""
                   }
                },
                {
                   context: "/10_61_143_52",
                   host: "10.61.143.52",
                   port: 8399,
                   https: false,
                   changeOrigin: false,
                   xforward: false,
                   rewrite: {
                       "^/10_61_143_52": ""
                   }
                },
                {
                   context: "/bsu-uio_fhhnet_stadt_hamburg_de",
                   host: "bsu-uio.fhhnet.stadt.hamburg.de",
                   port: 8083,
                   https: false,
                   changeOrigin: false,
                   xforward: false,
                   rewrite: {
                       "^/bsu-uio_fhhnet_stadt_hamburg_de": ""
                   }
                },
                {
                   context: "/bsu-ims",
                   host: "bsu-ims",
                   port: 8080,
                   https: false,
                   changeOrigin: false,
                   xforward: false,
                   rewrite: {
                       "^/bsu-ims": ""
                   }
                },
                {
                   context: "/bsu-ims_fhhnet_stadt_hamburg_de",
                   host: "bsu-ims.fhhnet.stadt.hamburg.de",
                   port: 8080,
                   https: false,
                   changeOrigin: false,
                   xforward: false,
                   rewrite: {
                       "^/bsu-ims_fhhnet_stadt_hamburg_de": ""
                   }
                },
                {
                   context: "/geofos_fhhnet_stadt_hamburg_de",
                   host: "geofos.fhhnet.stadt.hamburg.de",
                   port: 80,
                   https: false,
                   changeOrigin: false,
                   xforward: false,
                   rewrite: {
                       "^/geofos_fhhnet_stadt_hamburg_de": ""
                   }
                },
                {
                   context: "/geodienste_hamburg_de",
                   host: "geodienste.hamburg.de",
                   port: 80,
                   https: false,
                   changeOrigin: false,
                   xforward: false,
                   rewrite: {
                       "^/geodienste_hamburg_de": ""
                   }
                },
                {
                   context: "/wfalgqa003_dpaorins_de",
                   host: "wfalgqa003.dpaorins.de",
                   port: 80,
                   https: false,
                   changeOrigin: false,
                   xforward: false,
                   rewrite: {
                       "^/wfalgqa003_dpaorins_de": ""
                   }
                },
                {
                   context: "/hmbtg_geronimus_info",
                   host: "hmbtg.geronimus.info",
                   port: 80,
                   https: false,
                   changeOrigin: false,
                   xforward: false,
                   rewrite: {
                       "^/hmbtg_geronimus_info": ""
                   }
                },
                {
                   context: "/geofos",
                   host: "geofos",
                   port: 80,
                   https: false,
                   changeOrigin: false,
                   xforward: false,
                   rewrite: {
                       "^/geofos": ""
                   }
                },
        // -----------------Internet-----------------------
                {
                   context: "/geodienste-hamburg_de",
                   host: "wfalgqw001",
                   port: 80,
                   https: false,
                   changeOrigin: false,
                   xforward: false,
                   rewrite: {
                       "^/geodienste-hamburg_de": ""
                   }
                },
                {
                   context: "/geodaten_metropolregion_hamburg_de",
                   host: "wfalgqw001",
                   port: 80,
                   https: false,
                   changeOrigin: false,
                   xforward: false,
                   rewrite: {
                       "^/geodaten_metropolregion_hamburg_de": ""
                   }
                },
                {
                   context: "/map1_hamburg_de",
                   host: "wfalgqw001",
                   port: 80,
                   https: false,
                   changeOrigin: false,
                   xforward: false,
                   rewrite: {
                       "^/map1_hamburg_de": ""
                   }
                },
                {
                   context: "/hmbtg_geronimus_info",
                   host: "wfalgqw001",
                   port: 80,
                   https: false,
                   changeOrigin: false,
                   xforward: false,
                   rewrite: {
                       "^/hmbtg_geronimus_info": ""
                   }
                },
                {
                   context: "/extmap_hbt_de",
                   host: "wfalgqw001",
                   port: 80,
                   https: false,
                   changeOrigin: false,
                   xforward: false,
                   rewrite: {
                       "^/extmap_hbt_de": ""
                   }
                },
                {
                   context: "/bkg_suggest",
                   host: "wfalgqw001",
                   port: 80,
                   https: false,
                   changeOrigin: false,
                   xforward: false
                },
                {
                    context: "/bkg_geosearch",
                    host: "wfalgqw001",
                    port: 80,
                    https: false,
                    changeOrigin: false,
                    xforward: false
                },
        // -----------------Rest FHH-----------------------
                {
                   context: "/hmdk_fhhnet_stadt_hamburg_de",
                   host: "wfalgqw001",
                   port: 80,
                   https: false,
                   changeOrigin: false,
                   xforward: false
                },
                {
                   context: "/geofos_fhhnet_stadt_hamburg_de",
                   host: "wfalgqw001",
                   port: 80,
                   https: false,
                   changeOrigin: false,
                   xforward: false
                },
        // -----------------Rest Internet------------------
                {
                   context: "/87_106_16_168",
                   host: "wfalgqw001",
                   port: 80,
                   https: false,
                   changeOrigin: false,
                   xforward: false,
                   rewrite: {
                       "^/87_106_16_168": ""
                   }
                },
                {
                   context: "/gateway_hamburg_de",
                   host: "wfalgqw001",
                   port: 80,
                   https: false,
                   changeOrigin: false,
                   xforward: false,
                   rewrite: {
                       "^/gateway_hamburg_de": ""
                   }
                },
                {
                   context: "/metaver_de",
                   host: "wfalgqw001",
                   port: 80,
                   https: false,
                   changeOrigin: false,
                   xforward: false,
                   rewrite: {
                       "^/metaver_de": ""
                   }
                },
        // -----------------Fluechtlinge-------------------
                {
                   context: "/lgvfds02_fhhnet_stadt_hamburg_de",
                   host: "lgvfds02.fhhnet.stadt.hamburg.de",
                   port: 80,
                   https: false,
                   changeOrigin: false,
                   xforward: false,
                   rewrite: {
                       "^/lgvfds02_fhhnet_stadt_hamburg_de": ""
                   }
                },
                {
                   context: "/lgvfds01_fhhnet_stadt_hamburg_de",
                   host: "lgvfds01.fhhnet.stadt.hamburg.de",
                   port: 80,
                   https: false,
                   changeOrigin: false,
                   xforward: false,
                   rewrite: {
                       "^/lgvfds01_fhhnet_stadt_hamburg_de": ""
                   }
                },
                {
                   context: "/geofos_fhhnet_stadt_hamburg_de",
                   host: "geofos.fhhnet.stadt.hamburg.de",
                   port: 80,
                   https: false,
                   changeOrigin: false,
                   xforward: false,
                   rewrite: {
                       "^/geofos_fhhnet_stadt_hamburg_de": ""
                   }
                },
                {
                   context: "/wsca0620_fhhnet_stadt_hamburg_de",
                   host: "wsca0620.fhhnet.stadt.hamburg.de",
                   port: 80,
                   https: false,
                   changeOrigin: false,
                   xforward: false,
                   rewrite: {
                       "^/wsca0620_fhhnet_stadt_hamburg_de": ""
                   }
                },
                {
                   context: "/bsu-uio_fhhnet_stadt_hamburg_de",
                   host: "bsu-uio.fhhnet.stadt.hamburg.de",
                   port: 80,
                   https: false,
                   changeOrigin: false,
                   xforward: false,
                   rewrite: {
                       "^/bsu-uio_fhhnet_stadt_hamburg_de": ""
                   }
                },
                {
                   context: "/bsu-ims_fhhnet_stadt_hamburg_de",
                   host: "bsu-ims.fhhnet.stadt.hamburg.de",
                   port: 80,
                   https: false,
                   changeOrigin: false,
                   xforward: false,
                   rewrite: {
                       "^/bsu-ims_fhhnet_stadt_hamburg_de": ""
                   }
                },
                {
                   context: "/hmbtg_geronimus_info",
                   host: "hmbtg.geronimus.info",
                   port: 80,
                   https: false,
                   changeOrigin: false,
                   xforward: false,
                   rewrite: {
                       "^/hmbtg_geronimus_info": ""
                   }
                },
        // --------------------Alt-------------------------
                {
                    context: "/gpkswm",
                    host: "wfalgqw001",
                    port: 80,
                    https: false,
                    changeOrigin: false,
                    xforward: false
                },
                {
                    context: "/maps.duesseldorf",
                    host: "maps.duesseldorf.de",
                    port: 80,
                    https: false,
                    changeOrigin: false,
                    xforward: false,
                    rewrite: {
                        "^/maps.duesseldorf": ""
                    }
                },
                {
                    context: "/geodienste-hamburg",
                    host: "wfalgqw001",
                    port: 80,
                    https: false,
                    changeOrigin: false,
                    xforward: false
                },
                {
                    context: "/geofos",
                    host: "geofos.fhhnet.stadt.hamburg.de",
                    port: 80,
                    https: false,
                    changeOrigin: false,
                    xforward: false,
                    rewrite: {
                        // "^/geofos" : "" //not needed here for some reason @TODO check again
                    }
                },
                {
                    context: "/hmdk",
                    host: "hmdk.fhhnet.stadt.hamburg.de",
                    port: 80,
                    https: false,
                    changeOrigin: false,
                    xforward: false,
                    rewrite: {
                        "^/hmdk" : "" //not needed here for some reason @TODO check again
                    }
                },
                {
                    context: "/wfalgqw001",
                    host: "wfalgqw001.fhhnet.stadt.hamburg.de",
                    port: 80,
                    https: false,
                    changeOrigin: false,
                    xforward: false,
                    rewrite: {
                        "^/wfalgqw001": "" // not needed here for some reason @TODO check again
                    }
                },
                {
                    context: "/lgvfds01",
                    host: "lgvfds01.fhhnet.stadt.hamburg.de",
                    port: 80,
                    https: false,
                    changeOrigin: false,
                    xforward: false,
                    rewrite: {
                        "^/lgvfds01": ""
                    }
                },
                {
                    context: "/wsca0620",
                    host: "wsca0620.fhhnet.stadt.hamburg.de",
                    port: 8399,
                    https: false,
                    changeOrigin: false,
                    xforward: false,
                    rewrite: {
                        "^/wsca0620": ""
                    }
                },
                {
                    context: "/bsu-ims",
                    host: "bsu-ims.fhhnet.stadt.hamburg.de",
                    port: 8080,
                    https: false,
                    changeOrigin: false,
                    xforward: false,
                    rewrite: {
                        "^/bsu-ims": ""
                    }
                },
                {
                    context: "/bsu-uio",
                    host: "bsu-uio.fhhnet.stadt.hamburg.de",
                    port: 8083,
                    https: false,
                    changeOrigin: false,
                    xforward: false,
                    rewrite: {
                        "^/bsu-uio": ""
                    }
                },
                {
                    context: "/lgvfds02",
                    host: "lgvfds02.fhhnet.stadt.hamburg.de",
                    port: 80,
                    https: false,
                    changeOrigin: false,
                    xforward: false,
                    rewrite: {
                        "^/lgvfds02": ""
                    }
                },
                {
                    context: "/wms_hvv",
                    host: "geofos.fhhnet.stadt.hamburg.de",
                    port: 80,
                    https: false,
                    changeOrigin: false,
                    xforward: false
                },
                {
                    context: "/viomRouting",
                    host: "wfalgqw001.fhhnet.stadt.hamburg.de",
                    port: 80,
                    https: false,
                    changeOrigin: false,
                    xforward: false
                },
                {
                    context: "/cgi-bin",
                    host: "wfalgqw001.fhhnet.stadt.hamburg.de",
                    port: 80,
                    https: false,
                    changeOrigin: false,
                    xforward: false
                }
            ]
    }
};
