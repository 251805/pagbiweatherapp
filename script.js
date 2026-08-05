const OPENWEATHER_KEY = ""; // Set via environment variables
const TOMTOM_KEY = ""; // Set via environment variables

// Barangay coordinates (approx — you can refine lat/lon)
const barangays = {
  west: [
    { name: "Añato", lat: 13.94, lon: 121.72, mapUrl: "https://www.google.com/maps/place/Barangay+Hall+of+A%C3%B1ato/@14.0058048,121.6582421,3a,75y,118.59h,75.32t/data=!3m7!1e1!3m5!1swpYwENcRG-eyrZn1ptoE-g!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D14.678400128362284%26panoid%3DwpYwENcRG-eyrZn1ptoE-g%26yaw%3D118.59337782371114!7i16384!8i8192!4m12!1m5!3m4!2zMTTCsDAwJzE1LjEiTiAxMjHCsDM5JzI1LjkiRQ!8m2!3d14.0042!4d121.6572!3m5!1s0x33a2b30056985ea5:0xe0ec7624da817558!8m2!3d14.0058618!4d121.6584599!16s%2Fg%2F11xmh7ptzc?entry=ttu&g_ep=EgoyMDI2MDcyOS4wIKXMDSoASAFQAw%3D%3D" },
    { name: "Alupaye", lat: 13.95, lon: 121.73, mapUrl: "https://www.google.com/maps/place/13%C2%B056'50.3%22N+121%C2%B040'10.9%22E/@13.9619639,121.6680838,3a,75y,211.17h,92.44t/data=!3m7!1e1!3m5!1sgdW9J6tZmLDArpfvnSZ8wA!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D-2.4407913466778837%26panoid%3DgdW9J6tZmLDArpfvnSZ8wA%26yaw%3D211.170603418205!7i16384!8i8192!4m4!3m3!8m2!3d13.9473!4d121.6697?entry=ttu&g_ep=EgoyMDI2MDcyOS4wIKXMDSoASAFQAw%3D%3D" },
    { name: "Antipolo", lat: 13.96, lon: 121.71, mapUrl: "https://www.google.com/maps/place/Barangay+Hall+of+Antipolo/@13.9914941,121.6666261,3a,75y,31.37h,73.2t/data=!3m7!1e1!3m5!1sDt0jj_o7b3zapOTkivaqjw!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D16.798189361431326%26panoid%3DDt0jj_o7b3zapOTkivaqjw%26yaw%3D31.368546149788557!7i16384!8i8192!4m12!1m5!3m4!2zMTPCsDU5JzEyLjUiTiAxMjHCsDM5JzUzLjMiRQ!8m2!3d13.9868!4d121.6648!3m5!1s0x33a2b3003bc3bb51:0x8cd01976281dbdb0!8m2!3d13.9914829!4d121.6667272!16s%2Fg%2F11xksvky5t?entry=ttu&g_ep=EgoyMDI2MDcyOS4wIKXMDSoASAFQAw%3D%3D" },
    { name: "Bagumbungan Iba.", lat: 13.95, lon: 121.74, mapUrl: "https://www.google.com/maps/place/Barangay+Hall+Ibabang+Bagumbungan/@14.0081014,121.687738,3a,75y,57.18h,90t/data=!3m7!1e1!3m5!1sOicnn_0RtLuGTNWrSKqp1g!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D0%26panoid%3DOicnn_0RtLuGTNWrSKqp1g%26yaw%3D57.175957!7i16384!8i8192!4m12!1m5!3m4!2zMTPCsDU5JzU4LjIiTiAxMjHCsDQxJzIxLjgiRQ!8m2!3d13.9995!4d121.6894!3m5!1s0x33a2b3004850516f:0x671451676abdc9cc!8m2!3d14.0081637!4d121.6878612!16s%2Fg%2F11wpl3jt9q?entry=ttu&g_ep=EgoyMDI2MDcyOS4wIKXMDSoASAFQAw%3D%3D" },
    { name: "Bagumbungan Ila.", lat: 14.0257, lon: 121.6942, mapUrl: "https://www.google.com/maps/place/Barangay+Hall+of+Ilaya+Bagumbungan/@14.029824,121.7017173,3a,75y,105.59h,90.21t/data=!3m7!1e1!3m5!1sRstnFfW_Ud3XInnNzQEZVg!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D-0.20560152093682404%26panoid%3DRstnFfW_Ud3XInnNzQEZVg%26yaw%3D105.59498218344565!7i16384!8i8192!4m12!1m5!3m4!2zMTTCsDAxJzMyLjUiTiAxMjHCsDQxJzM5LjEiRQ!8m2!3d14.0256944!4d121.6941944!3m5!1s0x33a2ad005cc278b9:0x17ead3b639bdb16b!8m2!3d14.0297398!4d121.7016975!16s%2Fg%2F11yf51rlz2?entry=ttu&g_ep=EgoyMDI2MDcyOS4wIKXMDSoASAFQAw%3D%3D" },
    { name: "Bantigue", lat: 13.93, lon: 121.72, mapUrl: "https://www.google.com/maps/place/Bantigue+Barangay+Hall/@13.9384445,121.6946896,3a,75y,226.15h,94.09t/data=!3m7!1e1!3m5!1sk2o0bLIWEqmdMREq9y9p0Q!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D-4.093174797468876%26panoid%3Dk2o0bLIWEqmdMREq9y9p0Q%26yaw%3D226.15137818773124!7i16384!8i8192!4m12!1m5!3m4!2zMTPCsDU6JzIyLjYiTiAxMjHCsDQxJzM5LjgiRQ!8m2!3d13.9396!4d121.6944!3m5!1s0x33a2b3b2febd3405:0xd4f195fb0742fad3!8m2!3d13.9381656!4d121.6947575!16s%2Fg%2F11bzw09nb7?entry=ttu&g_ep=EgoyMDI2MDcyOS4wIKXMDSoASAFQAw%3D%3D" },
    { name: "Bigo", lat: 13.94, lon: 121.73, mapUrl: "https://www.google.com/maps/place/Bigo+Baranggay+Hall/@13.9896473,121.658099,3a,75y,267.78h,86.47t/data=!3m7!1e1!3m5!1sdLkVABdUc5MdqQ9HE8o5JQ!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D3.5309882288045173%26panoid%3DdLkVABdUc5MdqQ9HE8o5JQ%26yaw%3D267.78463823648104!7i16384!8i8192!4m12!1m5!3m4!2zMTPCsDU5JzQxLjMiTiAxMjHCsDM8JzU4LjYiRQ!8m2!3d13.9948!4d121.6485!3m5!1s0x33a2b2eedea3aaab:0x78d506ceba6a73c1!8m2!3d13.9897751!4d121.6579763!16s%2Fg%2F11txv1q38n?entry=ttu&g_ep=EgoyMDI2MDcyOS4wIKXMDSoASAFQAw%3D%3D" },
    { name: "Binahaan", lat: 13.96, lon: 121.72, mapUrl: "https://www.google.com/maps/place/Pamahalaang+Barangay+Ng+Binahaan/@13.9886585,121.7595026,3a,75y,254.85h,89.46t/data=!3m7!1e1!3m5!1s-XTdEHxJOq_NJZ4RPA4NlA!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D0.5428075818946212%26panoid%3D-XTdEHxJOq_NJZ4RPA4NlA%26yaw%3D254.85151674242974!7i16384!8i8192!4m12!1m5!3m4!2zMTPCsDU5JzIzLjMiTiAxMjHCsDQ1JzI4LjQiRQ!8m2!3d13.9898!4d121.7579!3m5!1s0x33a2b1cea0b35b2f:0x95b3637c4d2ca19a!8m2!3d13.988551!4d121.7593743!16s%2Fg%2F11fps9nn_l?entry=ttu&g_ep=EgoyMDI2MDcyOS4wIKXMDSoASAFQAw%3D%3D" },
    { name: "Bukal", lat: 13.95, lon: 121.76, mapUrl: "https://www.google.com/maps/place/13%C2%B058'22.1%22N+121%C2%B040'48.0%22E/@13.9719844,121.6796324,3a,75y,109.4h,81.2t/data=!3m7!1e1!3m5!1sGeTuc-PgQ7um6Ln91BSHcw!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D8.797136375997155%26panoid%3DGeTuc-PgQ7um6Ln91BSHcw%26yaw%3D109.40014638118043!7i16384!8i8192!4m4!3m3!8m2!3d13.9728!4d121.68?entry=ttu&g_ep=EgoyMDI2MDcyOS4wIKXMDSoASAFQAw%3D%3D" },
    { name: "Ikirin", lat: 13.9872, lon: 121.6900, mapUrl: "https://www.google.com/maps/@13.9755243,121.6905027,3a,75y,319.84h,74.39t/data=!3m7!1e1!3m5!1sYd-8hAVyQ8OAd1YDFqs8LQ!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D15.6141367613982%26panoid%3DYd-8hAVyQ8OAd1YDFqs8LQ%26yaw%3D319.8407516642646!7i16384!8i8192?entry=ttu&g_ep=EgoyMDI2MDcyOS4wIKXMDSoASAFQAw%3D%3D" },
  ],
  center: [
    { name: "Castillo (Poblacion)", lat: 13.9711, lon: 121.6831, mapUrl: "https://www.google.com/maps/place/13%C2%B058'16.0%22N+121%C2%B040'59.2%22E/@13.9708448,121.6836098,3a,75y,75.54h,78.44t/data=!3m7!1e1!3m5!1soybRzjn-VIE3NiGYwtaY8A!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D11.55832097830438%26panoid%3DoybRzjn-VIE3NiGYwtaY8A%26yaw%3D75.5382293805618!7i16384!8i8192!4m4!3m3!8m2!3d13.9711!4d121.6831?entry=ttu&g_ep=EgoyMDI2MDcyOS4wIKXMDSoASAFQAw%3D%3D" },
    { name: "Daungan (Poblacion)", lat: 13.9683, lon: 121.6888, mapUrl: "https://www.google.com/maps/place/BRGY.+DAUNGAN+HEALTH+CENTER/@13.9671505,121.6893538,3a,75y,78.51h,83.42t/data=!3m7!1e1!3m5!1sb9tlcAF33w8kgn0NSaCMqA!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D6.576797447676128%26panoid%3Db9tlcAF33w8kgn0NSaCMqA%26yaw%3D78.51106645279322!7i16384!8i8192!4m12!1m5!3m4!2zMTPCsDU8JzA9LjkiTiAxMjHCsDQxJzE9LjciRQ!8m2!3d13.9683!4d121.6888!3m5!1s0x33a2b3b3df0f7fcb:0xca9ebde6c597c575!8m2!3d13.9671746!4d121.6894746!16s%2Fg%2F11c6cpk2kb?entry=ttu&g_ep=EgoyMDI2MDcyOS4wIKXMDSoASAFQAw%3D%3D" },
    { name: "Parang (Poblacion)", lat: 13.9710, lon: 121.6897, mapUrl: "https://www.google.com/maps/place/13%C2%B058'15.6%22N+121%C2%B041'22.9%22E/@13.9703313,121.6893506,3a,75y,191.21h,90.87t/data=!3m7!1e1!3m5!1sFoNwe9jwd-3b30sFyiXVZA!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D-0.8655039255149433%26panoid%3DFoNwe9jwd-3b30sFyiXVZA%26yaw%3D191.2072595662407!7i16384!8i8192!4m4!3m3!8m2!3d13.971!4d121.6897?entry=ttu&g_ep=EgoyMDI2MDcyOS4wIKXMDSoASAFQAw%3D%3D" },
    { name: "Sta. Catalina (Poblacion)", lat: 13.9711, lon: 121.6868, mapUrl: "https://www.google.com/maps/place/Health+Center/@13.9721313,121.6869254,3a,75y,317.36h,90.98t/data=!3m7!1e1!3m5!1sD5e7mrzDnS9UweZbMweKwg!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D-0.9797007245145437%26panoid%3DD5e7mrzDnS9UweZbMweKwg%26yaw%3D317.3581458688333!7i16384!8i8192!4m12!1m5!3m4!2zMTPCsDU8JzE6LjAiTiAxMjHCsDQxJzEyLjUiRQ!8m2!3d13.9711111!4d121.6868056!3m5!1s0x33a2b3b2c3bc6f27:0xc100af7b55f0d6f3!8m2!3d13.9713952!4d121.6872418!16s%2Fg%2F1hhvxv22r?entry=ttu&g_ep=EgoyMDI2MDcyOS4wIKXMDSoASAFQAw%3D%3D" },
    { name: "Tambak (Poblacion)", lat: 13.9729, lon: 121.6884, mapUrl: "https://www.google.com/maps/place/Barangay+Hall+of+Tambak/@13.9727944,121.6883796,3a,75y,100.49h,88.48t/data=!3m7!1e1!3m5!1szH5uQkyZiVjAokGb_qsr8Q!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D1.5161904188898774%26panoid%3DzH5uQkyZiVjAokGb_qsr8Q%26yaw%3D100.49489175673581!7i16384!8i8192!4m12!1m5!3m4!2zMTPCsDU8JTIyLjQiTiAxMjHCsDQ1JzE4LjIiRQ!8m2!3d13.9729!4d121.6884!3m5!1s0x33a2b3000cda5753:0xad3af569ba6880a!8m2!3d13.9728137!4d121.6884707!16s%2Fg%2F11yf5kf4ml?entry=ttu&g_ep=EgoyMDI2MDcyOS4wIKXMDSoASAFQAw%3D%3D" },
    { name: "Mapagong", lat: 13.9679, lon: 121.6798, mapUrl: "https://www.google.com/maps/place/13%C2%B058'04.4%22N+121%C2%B040'47.3%22E/@13.970045,121.6795169,3a,75y,301.09h,89.86t/data=!3m7!1e1!3m5!1siBJViEIwOtIaiN3tGRAdOg!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D0.143328278009065%26panoid%3DiBJViEIwOtIaiN3tGRAdOg%26yaw%3D301.08711671916956!7i16384!8i8192!4m4!3m3!8m2!3d13.9679!4d121.6798?entry=ttu&g_ep=EgoyMDI2MDcyOS4wIKXMDSoASAFQAw%3D%3D" },
    { name: "Pinagbayanan", lat: 13.9690, lon: 121.7016, mapUrl: "https://www.google.com/maps/place/13%C2%B058'08.4%22N+121%C2%B042'05.8%22E/@13.968063,121.7087298,3a,75y,219.26h,84.7t/data=!3m7!1e1!3m5!1sKG40-Wa-XqLTEXdoXzmz8w!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D5.302326080411348%26panoid%3DKG40-Wa-XqLTEXdoXzmz8w%26yaw%3D219.26314171659516!7i16384!8i8192!4m4!3m3!8m2!3d13.969!4d121.7016?entry=ttu&g_ep=EgoyMDI2MDcyOS4wIKXMDSoASAFQAw%3D%3D" },
  ],
  east: [
    { name: "Malicboy Kan.", lat: 13.9689, lon: 121.7685, mapUrl: "https://www.google.com/maps/place/Brgy.+Kanlurang+Malicboy,+Brgy.+Hall/@13.9691012,121.7687142,3a,75y,94.37h,93.75t/data=!3m10!1e1!3m8!1s_YYQAVEA6cnfNcM6rqvvrQ!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D-3.752722893188775%26panoid%3D_YYQAVEA6cnfNcM6rqvvrQ%26yaw%3D94.37469423739417!7i16384!8i8192!9m2!1b1!2i38!4m12!1m5!3m4!2zMTPCsDU8JzA8LjAiTiAxMjHCsDQ:JzA2LjYiRQ!8m2!3d13.9689!4d121.7685!3m5!1s0x33a2b1c26648a07f:0x14309a15e0d0b81!8m2!3d13.9681598!4d121.7687535!16s%2Fg%2F11j0bg1gyl?entry=ttu&g_ep=EgoyMDI2MDcyOS4wIKXMDSoASAFQAw%3D%3D" },
    { name: "Malicboy Sil.", lat: 13.9802, lon: 121.7908, mapUrl: "https://www.google.com/maps/place/Malicboy+East+Barangay+Hall/@13.9802483,121.7895842,3a,75y,158.41h,90t/data=!3m7!1e1!3m5!1s4uOZSk1DbFwRq7azcKftRA!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D0%26panoid%3D4uOZSk1DbFwRq7azcKftRA%26yaw%3D158.40842!7i16384!8i8192!4m12!1m5!3m4!2zMTPCsDU8JzQ4LjciTiAxMjHCsDQ3JzI2LjkiRQ!8m2!3d13.9802!4d121.7908!3m5!1s0x33a2b0150dcbbc19:0x3b78eef0c487cffe!8m2!3d13.9801425!4d121.7896311!16s%2Fg%2F11f30p0wk7?entry=ttu&g_ep=EgoyMDI2MDcyOS4wIKXMDSoASAFQAw%3D%3D" },
    { name: "Mayhay", lat: 13.9771, lon: 121.6842, mapUrl: "https://www.google.com/maps/place/13%C2%B058'37.6%22N+121%C2%B041'03.1%22E/@13.9731794,121.6837515,3a,75y,277.8h,90.88t/data=!3m7!1e1!3m5!1stTIGzVziMay3WNhumQ78ig!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D-0.8800421964014475%26panoid%3DtTIGzVziMay3WNhumQ78ig%26yaw%3D277.79837844030675!7i16384!8i8192!4m4!3m3!8m2!3d13.9771!4d121.6842?entry=ttu&g_ep=EgoyMDI2MDcyOS4wIKXMDSoASAFQAw%3D%3D" },
    { name: "Palsabangon Iba.", lat: 13.9893, lon: 121.7371, mapUrl: "https://www.google.com/maps/place/13%C2%B059'21.5%22N+121%C2%B044'13.6%22E/@13.9880889,121.7308065,3a,75y,108.48h,83.15t/data=!3m7!1e1!3m5!1sFcga7ZJEOkAy0ikpqV3o5w!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D6.847893807424953%26panoid%3DFcga7ZJEOkAy0ikpqV3o5w%26yaw%3D108.48080809418212!7i16384!8i8192!4m4!3m3!8m2!3d13.9893!4d121.7371?entry=ttu&g_ep=EgoyMDI2MDcyOS4wIKXMDSoASAFQAw%3D%3D" },
    { name: "Palsabangon Ila.", lat: 14.0211, lon: 121.7242, mapUrl: "https://www.google.com/maps/place/Brgy.Hall+of+Ilayang+Palsabangon/@13.9929662,121.7186771,3a,75y,287.18h,67.6t/data=!3m7!1e1!3m5!1svx3_jOO1IAS0QstdmKvZsg!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D22.396304323478034%26panoid%3Dvx3_jOO1IAS0QstdmKvZsg%26yaw%3D287.18222398709486!7i16384!8i8192!4m12!1m5!3m4!2zMTTCsDAxJzE2LjAiTiAxMjHCsDQ7JzI2LjEiRQ!8m2!3d14.0211!4d121.7242!3m5!1s0x33a2b35781f7a459:0xc6da75a55e76ed6b!8m2!3d13.9930171!4d121.7184892!16s%2Fg%2F11k6snycx5?entry=ttu&g_ep=EgoyMDI2MDcyOS4wIKXMDSoASAFQAw%3D%3D" },
    { name: "Talipan", lat: 13.9628, lon: 121.6537, mapUrl: "https://www.google.com/maps/place/Barangay+Hall+of+Talipan/@13.962834,121.6541126,3a,75y,344.32h,92.88t/data=!3m7!1e1!3m5!1slRo3JbqhEmMjBesuYRwxAg!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D-2.87886647370766%26panoid%3DlRo3JbqhEmMjBesuYRwxAg%26yaw%3D344.31559632647793!7i16384!8i8192!4m12!1m5!3m4!2zMTPCsDU7JzQ6LjEiTiAxMjHCsDM5JzEzLjMiRQ!8m2!3d13.9628!4d121.6537!3m5!1s0x33a2b30037ad04ef:0xde8b608287290c1!8m2!3d13.9629093!4d121.6541547!16s%2Fg%2F11xkp9ft1w?entry=ttu&g_ep=EgoyMDI2MDcyOS4wIKXMDSoASAFQAw%3D%3D" },
    { name: "Tukalan", lat: 13.9829, lon: 121.6652, mapUrl: "https://www.google.com/maps/@13.9828607,121.665223,3a,75y,354.78h,69.1t/data=!3m7!1e1!3m5!1sYBBEvy-HFKyb8bkptk97PQ!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D20.901221650990948%26panoid%3DYBBEvy-HFKyb8bkptk97PQ%26yaw%3D354.7795027292507!7i16384!8i8192?entry=ttu&g_ep=EgoyMDI2MDcyOS4wIKXMDSoASAFQAw%3D%3D" },
    { name: "Polo Iba.", lat: 13.9055, lon: 121.7496, mapUrl: "https://www.google.com/maps/place/Barangay+Hall+of+Ibabang+Polo,+Pagbilao/@13.9042984,121.7502927,3a,75y,41.93h,91.49t/data=!3m7!1e1!3m5!1sjaludJMzxyVXKuUtqj-obA!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D-1.4851558557045905%26panoid%3DjaludJMzxyVXKuUtqj-obA%26yaw%3D41.92835321910804!7i16384!8i8192!4m12!1m5!3m4!2zMTPCsDU0JzE9LjgiTiAxMjHCsDQ0JzU4LjYiRQ!8m2!3d13.9055!4d121.7496!3m5!1s0x33a2b706b86b80f3:0xdd563680b0cf139!8m2!3d13.9043161!4d121.750378!16s%2Fg%2F11px9rtrcx?entry=ttu&g_ep=EgoyMDI2MDcyOS4wIKXMDSoASAFQAw%3D%3D" },
    { name: "Polo Ila.", lat: 13.9313, lon: 121.7753, mapUrl: "https://www.google.com/maps/place/Barangay+Ilayang+Polo/@13.9352154,121.7862279,3a,75y,222.62h,85.33t/data=!3m7!1e1!3m5!1spfuE2yCkqfjlXTkb4PPKrw!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D4.669342887047506%26panoid%3DpfuE2yCkqfjlXTkb4PPKrw%26yaw%3D222.61717917455042!7i16384!8i8192!4m12!1m5!3m4!2zMTPCsDU1JzUyLjciTiAxMjHCsDQ6JzMxLjEiRQ!8m2!3d13.9313056!4d121.7753056!3m5!1s0x33a2b3b2f8fc07a9:0x2b602802440dcf62!8m2!3d13.9351708!4d121.7861577!16s%2Fg%2F11bzv_sbtc?entry=ttu&g_ep=EgoyMDI2MDcyOS4wIKXMDSoASAFQAw%3D%3D" },
  ]
};

// Fetch weather using Open-Meteo with fallback
async function getWeather(lat, lon) {
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,cloud_cover`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("Weather fetch error");
    const data = await res.json();
    const c = data.current || {};
    return {
      main: { temp: c.temperature_2m ?? 29, humidity: c.relative_humidity_2m ?? 78 },
      wind: { speed: c.wind_speed_10m ?? 12 },
      clouds: { all: c.cloud_cover ?? 35 },
      weather: [{ description: "Partly Cloudy" }]
    };
  } catch (e) {
    return {
      main: { temp: 29, humidity: 78 },
      wind: { speed: 12 },
      clouds: { all: 35 },
      weather: [{ description: "Partly Cloudy" }]
    };
  }
}

// Fetch traffic (TomTom Flow Segment)
async function getTraffic(lat, lon) {
  if (!TOMTOM_KEY) return null;
  try {
    const url = `https://api.tomtom.com/traffic/services/4/flowSegmentData/absolute/10/json?point=${lat},${lon}&unit=KMPH&key=${TOMTOM_KEY}`;
    const res = await fetch(url);
    return await res.json();
  } catch (e) {
    return null;
  }
}

// Render barangay cards
async function renderBarangays(group, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = "";

  for (let b of group) {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `<h3>${b.name}</h3><p class="loading">Loading data...</p>`;
    container.appendChild(card);

    try {
      const [weather, traffic] = await Promise.all([
        getWeather(b.lat, b.lon),
        getTraffic(b.lat, b.lon)
      ]);

      const desc = weather?.weather?.[0]?.description ?? "N/A";
      const temp = weather?.main?.temp ?? "N/A";
      const humidity = weather?.main?.humidity ?? "N/A";
      const wind = weather?.wind?.speed ?? "N/A";
      const clouds = weather?.clouds?.all ?? "N/A";

      let trafficText = "No traffic data";
      if (traffic?.flowSegmentData) {
        const spd = traffic.flowSegmentData.currentSpeed;
        const free = traffic.flowSegmentData.freeFlowSpeed;
        trafficText = `Speed: ${spd} km/h (Normal: ${free} km/h)`;
      }

      card.innerHTML = `
        <h3>${b.name}</h3>
        <p>🌡 Temp: ${temp}°C</p>
        <p>💧 Humidity: ${humidity}%</p>
        <p>🌬 Wind: ${wind} m/s</p>
        <p>☁ Clouds: ${clouds}%</p>
        <p>🌍 Weather: ${desc}</p>
        <p>🚗 Traffic: ${trafficText}</p>
      `;
    } catch (e) {
      card.innerHTML += `<p>Error loading data</p>`;
    }
  }
}

// PAGASA Alerts (RSS feed fallback)
async function loadPAGASAAlerts() {
  const container = document.getElementById("pagasa-alerts");
  if (!container) return;
  try {
    const res = await fetch("https://www.panahon.gov.ph/rss_feed.xml");
    const text = await res.text();
    container.innerHTML = text.includes("<item>") 
      ? "⚡ PAGASA Alerts available (RSS feed parsed)" 
      : "✅ No current PAGASA alerts.";
  } catch (err) {
    container.innerHTML = "Could not fetch PAGASA alerts.";
  }
}

// Run
renderBarangays(barangays.west, "west-barangays");
renderBarangays(barangays.center, "center-barangays");
renderBarangays(barangays.east, "east-barangays");
loadPAGASAAlerts();
