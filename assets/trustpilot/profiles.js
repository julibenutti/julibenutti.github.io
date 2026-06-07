(function () {
  const otherReviewPool = [
    ["Wise", "wise.com", 5, "Transferencia clara", "El envio llego en el tiempo estimado y las comisiones fueron faciles de entender.", "13 de abril de 2026"],
    ["Trustpilot", "trustpilot.com", 4, "Sirve para comparar", "Ayuda a mirar varias experiencias antes de decidir. La interfaz resulta sencilla.", "9 de mayo de 2026"],
    ["Topstep", "topstep.com", 5, "Buen soporte de trading", "Respondieron rápido y dejaron claras las reglas de la evaluacion.", "27 de mayo de 2026"],
    ["Apex Trader Funding", "apextraderfunding.com", 4, "Proceso correcto", "La activación fue simple y el panel mostró la información necesaria.", "12 de abril de 2026"],
    ["Binance", "binance.com", 5, "Todo rápido", "La verificación y el movimiento de fondos funcionaron sin complicaciones.", "5 de junio de 2026"],
    ["Mercado Libre", "mercadolibre.com", 5, "Compra sin problemas", "El pedido llego bien embalado y el seguimiento fue claro.", "2 de abril de 2026"],
    ["Apple", "apple.com", 4, "Buena atención", "Resolvio una consulta de garantia y el proceso fue ordenado.", "8 de mayo de 2026"],
    ["Google Store", "store.google.com", 5, "Entrega rápida", "El producto llego antes de lo previsto y la comunicacion fue buena.", "16 de abril de 2026"],
    ["Revolut", "revolut.com", 4, "Uso simple", "La app es clara y permite resolver operaciónes sin llamar a soporte.", "31 de mayo de 2026"],
    ["Interactive Brokers", "interactivebrokers.com", 4, "Herramientas completas", "Tiene muchas funciones y requiere aprender, pero el servicio respondió bien.", "24 de abril de 2026"],
    ["Booking.com", "booking.com", 5, "Reserva clara", "La confirmacion llego rápido y los datos de la reserva estaban completos.", "7 de mayo de 2026"],
    ["Airbnb", "airbnb.com", 4, "Buena experiencia", "El anfitrion contesto rápido y la información del alojamiento era correcta.", "1 de abril de 2026"]
  ];

  const arOpinions = [
    ["6a1ef2a34a5f81e0477f799c", "6a1ef2c59670d8bbb5bd8da2", "MA", "mariana", "1 opinión", "5 jun 2026", 5, "De buscar el santo grial a solo querer generar plata", "Hace rato venía buscando algoritmos para XAUUSD y no encontraba nada que me cerrara. Con este método me cayó la ficha de que estaba buscando el santo grial, cuando en realidad lo importante era hacer plata con algo que tenga reglas y se pueda validar. Ese cambio de cabeza me sirvió muchísimo.", "5 de junio de 2026"],
    ["69fca00b2c1727e7b585ef3d", "69fca025f9da8e4c0e4e9704", "MD", "Mati Di Santolo", "1 opinión", "17 abr 2026", 5, "Claro y al punto", "Buen material. Me sirvió para entender cómo empezar a pasar reglas a Claude sin programar.", "17 de abril de 2026"],
    ["69df95180653b77473653875", "69df9526c618251554c6fca1", "MG", "Mag Giannussi", "1 opinión", "29 may 2026", 5, "No es humo", "Me gustó porque no promete plata fácil. Te muestra el proceso, los errores y cómo ir armando algo propio con datos. Hay partes que requieren sentarse, pero justamente por eso se siente serio.", "29 de mayo de 2026"],
    ["6867cc1b18a3fc8089faa81a", "69c3fd4d46ee7e08ba305031", "LV", "Laura Vilchez", "4 reseñas", "8 abr 2026", 5, "Muy útil si estás perdida con la IA", "Yo no sabía bien cómo usar Claude para algo práctico. Con este PDF entendí qué pedirle, cómo organizar las reglas y cómo revisar si lo que devuelve tiene sentido. Muy clara la explicación.", "8 de abril de 2026"],
    ["69c32c0b07ee8a8c0b00a220", "69c32c153387d4fea403dfb6", "AB", "angel de jesus Billordo", "1 opinión", "22 may 2026", 5, "Vengo de ICT pleno", "Vengo de ICT pleno. Retiré una vez en 3 años, así que para algo tenía que servir tanto estudio. El enfoque me ayudó a bajar todo eso a reglas y dejar de depender de si ese día estaba inspirado o no. Gracias Juli.", "22 de mayo de 2026"],
    ["60edc8ea34ec500012979f75", "69b478cb2ab394a531227a71", "DT", "DK Trader", "2 reseñas", "2 abr 2026", 5, "Buen puente entre trading y automatización", "Lo mejor para mí fue la parte de transformar una estrategia discrecional en condiciones más objetivas. Me interesaba automatizar pero siempre me trababa en cómo explicarle la lógica a la IA. El material baja bastante a tierra ese proceso.", "2 de abril de 2026"],
    ["60b78e3a0b9df00019c3aec8", "6995016f25f9da45df23a1fc", "LR", "Leandro Riccillo", "3 reseñas", "11 may 2026", 5, "Me destrabó una parte del proceso", "Había intentado armar algo parecido pero me perdía entre prompts, backtests y reglas mal definidas. Acá entendí que primero tenía que ordenar la doctrina y recién después pedir código. Parece obvio, pero no lo estaba haciendo.", "11 de mayo de 2026"],
    ["68b7445465125e0829624b30", "698e1607b1d40925b79afe43", "CU", "customer", "2 reseñas", "26 abr 2026", 5, "Recomendado", "Muy bueno el contenido, explicado simple y sin vueltas.", "26 de abril de 2026"],
    ["68a5fa21960069ab960af7a2", "698de1a5200b8d67ebff4804", "JR", "Juani Ruiz", "1 opinión", "3 jun 2026", 5, "Excelente guia", "Me gustó mucho la forma en que explica como usar la IA sin tener que saber programar. No es apretar un botón, pero si seguís los pasos se entiende.", "3 de junio de 2026"],
    ["697ea49860a40bbba7c9cf73", "697ea4c4a9fba87c20fc9a37", "BR", "Brian", "1 opinión", "14 abr 2026", 5, "Resolución de problema", "Julieta resolvió apropiadamente una inquietud vía e-mail. Recomiendo.", "14 de abril de 2026"],
    ["6927841e29e2593816dcddf1", "695ecd05d2fe411b63eea5a6", "VS", "Valentin Silva", "2 reseñas", "18 may 2026", 5, "Tuve coincidencia", "Había visto videos de Hhobbiecode y otros youtubers que hacen algoritmos, pero yo quería algo aplicado a lo mío. Incluso cuando vi la idea pensé: esto lo haría con las mentorías de @lit_trading_official. Después entré al Drive y estaba la mentoría ahí. Alta coincidencia.", "18 de mayo de 2026"],
    ["685ebef28a537580b37e7d00", "6951dd1e8297828901c40887", "AG", "Ariel Guarana", "1 opinión", "6 abr 2026", 5, "excelente atención", "Excelente atención de Julieta, me respondió una duda antes de entrar y fue todo claro.", "6 de abril de 2026"],
    ["694ea1bb31cbb9e44c7e4d25", "694ea1c63b09378d49a31cbd", "DC", "Dario Colman", "1 opinión", "1 jun 2026", 5, "rapidez y seriedad", "Tuve un problema con el pago y me lo solucionaron rápido. Después pude acceder al material sin problema.", "1 de junio de 2026"],
    ["673774da5b3bc4d895970b41", "694982c4dc2696e8dfff1307", "CQ", "Cristian Quesada", "3 reseñas", "23 abr 2026", 5, "Sirve para prop firms", "La parte de evaluaciones y reglas de riesgo me pareció muy buena. No lo tomaría como una promesa de pasar una cuenta, sino como una forma más seria de construir antes de volver a pagar challenges.", "23 de abril de 2026"],
    ["6867cc1b18a3fc8089faa81a", "693afb6ed8a50925a57ee169", "LV", "Laura Vilchez", "4 reseñas", "19 may 2026", 5, "Me ayudó a ordenar las reglas", "Lo que más me sirvió fue bajar mis ideas a reglas más claras. Antes tenía todo mezclado entre videos, notas y capturas. Con el PDF pude ordenarlo mejor y pedirle cosas más concretas a Claude.", "19 de mayo de 2026"],
    ["6619e4c2df518e00127de65e", "69363650512762fb9646d1a6", "JB", "Joaquin Barbero", "1 opinión", "4 may 2026", 5, "Muy buen material", "Muy buen material, se nota que viene de probar y equivocarse, no de teoría nomás.", "4 de mayo de 2026"],
    ["6931f287d7ccaa91db5de061", "6931f2af13245435a1616635", "LC", "Laureano Adriel Cecconi", "1 opinión", "30 may 2026", 5, "preciso y rápido", "Tenía una consulta sobre el acceso y me respondieron rápido. Todo correcto.", "30 de mayo de 2026"],
    ["6927841e29e2593816dcddf1", "6927842bfb31d4467bdf638c", "VS", "Valentin Silva", "2 reseñas", "18 may 2026", 5, "Era justo lo que quería hacer", "Ya venía con la idea de usar IA para convertir mentorías en algo más operativo, pero no sabía por dónde empezar. Este método me dio una estructura para encarar eso sin perderme en mil prompts sueltos.", "18 de mayo de 2026"],
    ["691f450429e259b645d37d9c", "691f450d750352d6a64b713e", "LO", "Luciano Olivet", "1 opinión", "12 abr 2026", 5, "responden rápido", "Responden rápido y aclaran las dudas con buena onda. El material también está muy bien armado.", "12 de abril de 2026"],
    ["676e919749d210f933297fe7", "690a33fc568961c143c725e3", "IJ", "IVANA PAMELA JASINSKI", "11 reseñas", "2 may 2026", 5, "SUPER CLARO", "Le di acceso al Drive a Claude con el material y fue una locura. Se encargó de ordenar las mentorías, sacar reglas y ayudarme a entender qué tenía sentido probar. Yo iba revisando, pero no tuve que arrancar de cero. SUPER claro todo.", "2 de mayo de 2026"],
    ["68fae5e0fdf7bf0b62c00ce3", "68fae5e9da46feb1ee2f83ed", "NA", "Nicolas Aragon", "1 opinión", "27 may 2026", 5, "Tenía una duda con el acceso", "Tenía una duda con el acceso al material y me contestaron rápido por mail. Todo ok.", "27 de mayo de 2026"],
    ["68faddfc8fbe559c336bbe6e", "68fade05715c403c384b12fe", "MS", "Mathias Struc", "1 opinión", "18 abr 2026", 5, "muy buena atención", "Muy buena atención. Me resolvieron el problema al instante.", "18 de abril de 2026"],
    ["673774da5b3bc4d895970b41", "68dc3673bfddcec1f9d94682", "CQ", "Cristian Quesada", "3 reseñas", "5 abr 2026", 5, "Me bajó la ansiedad de operar", "Vengo de trading manual y lo cuento porque venía operando bastante a ojo, esperando ver el setup perfecto. El sistema me ayudó a pasar eso a reglas más claras. Todavía estoy armándolo, estoy mirando números y no me quiero poner loco, pero ya me cambió la forma de mirar el trading.", "5 de abril de 2026"],
    ["676e919749d210f933297fe7", "689149e1eb0dba26c78f29ee", "IJ", "IVANA PAMELA JASINSKI", "11 reseñas", "14 may 2026", 5, "MUY BUENA EXPERIENCIA", "Muy buena experiencia. La explicación es clara y cuando tuve una duda me respondieron bien. No es magia, hay que sentarse, pero vale la pena.", "14 de mayo de 2026"],
    ["6867cc1b18a3fc8089faa81a", "688b840f98759064482a7adc", "LV", "Laura Vilchez", "4 reseñas", "22 abr 2026", 5, "Buena explicación", "Buena explicación para las que no venimos de programación. Me gustó que te muestra cómo pensar el sistema antes de pedirle código a la IA.", "22 de abril de 2026"],
    ["6867cc1b18a3fc8089faa81a", "688953a3ca78c0ad63ad13b2", "LV", "Laura Vilchez", "4 reseñas", "3 may 2026", 5, "Atención rápida de Julieta", "Julieta me respondió una consulta bastante rápido y fue amable. Después pude avanzar con el material sin problema.", "3 de mayo de 2026"],
    ["69312c756148eaeb4df7d2ed", "69312cb920be52f4b3b8cde1", "FG", "FACUNDO VICTOR G", "2 reseñas", "26 may 2026", 5, "El valor está en el método", "Lo fuerte no es un bot de trading, sino la forma de pensar el sistema: material, reglas, validación, errores y recién después código. Le pregunté una cosa puntual sobre Claude Code y Julieta me pasó un curso gratis para entenderlo mejor. Para alguien que viene de consumir cursos sin convertirlos en nada usable, ese cambio de enfoque vale mucho.", "26 de mayo de 2026"]
  ];

  const extraCountryOpinions = [
    ["686eae6f18a3fcad6d01fe48", "6a21c54605675493135568f1", "CU", "customer", "4 reseñas", "28 may 2026", 5, "Muy bueno gracias", "Muy bueno el material, gracias. Me sirvió para ordenar ideas que tenía sueltas.", "28 de mayo de 2026", "UY"],
    ["68bbc0f511121e4b4e698788", "69ebc483bc302eb44156c9bc", "PA", "Pamela", "5 reseñas", "10 abr 2026", 5, "Excelente atención de Julieta", "Tuve una duda antes de comprar y Julieta me respondió clarísimo. Después el acceso llegó bien y pude empezar sin vueltas.", "10 de abril de 2026", "UY"],
    ["6835f4052f24781e23033acb", "69fcad72bfd8653442f69ab6", "JF", "JOSE FERNEY", "12 reseñas", "21 may 2026", 5, "Tengo 20 cuentas Apex andando", "Vengo de estudiar mucho trading y siempre sentía que todo quedaba en teoría. Con este enfoque pude ordenar reglas, probarlas y hoy tengo 20 cuentas Apex andando con mi algo. Para mí fue un antes y después.", "21 de mayo de 2026", "CO"],
    ["69ca8b691a47fa857ebc62c9", "69f22a2242b4389a86f4b080", "EA", "estudio aprender", "2 reseñas", "1 abr 2026", 5, "Lo pude adaptar a NAS100", "Me considero vibecoder. Empecé hace 5 meses con IA y pude hacer cosas que antes ni pensaba. Agarré la lógica de MNQ / Nasdaq futures y la adapté a CFD NAS100 para mi cuenta de FTMO. No es copiar y pegar, pero te da el camino.", "1 de abril de 2026", "CO"],
    ["69bdac14e932106525bc9463", "69bdac2f0dc014e1da20e493", "JA", "Javier", "4 reseñas", "25 abr 2026", 5, "Requiere sentarse", "El contenido es bueno, pero no es para leerlo una tarde y listo. Hay que trabajar bastante. Igual lo prefiero así porque no vende humo.", "25 de abril de 2026", "MX"],
    ["6970fbad46988443c66d95a8", "69841565993bb5671fc13394", "GS", "Gaby Sille", "3 reseñas", "12 may 2026", 5, "Me ayudó con Claude", "Había usado IA para cosas simples, pero no para trading. La parte de cómo hablarle a Claude y qué pedirle me sirvió un montón.", "12 de mayo de 2026", "MX"]
  ];

  const allOpinions = [
    ...arOpinions.map((opinion) => [...opinion, "AR"]),
    ...extraCountryOpinions
  ];

  const profileTotalFromLabel = (label) => Number.parseInt(String(label).replace(/\D/g, ""), 10) || 1;

  const profiles = allOpinions.map(([id, reviewId, initials, name, countryReviewCount, displayDate, rating, title, body, experienceDate, country], index) => {
    const julibenuttiReview = {
      company: "julibenutti.com",
      domain: "julibenutti.com",
      rating,
      title,
      body,
      date: experienceDate,
      type: "Opinión espontánea",
      reviewId
    };
    const targetReviewTotal = Math.max(profileTotalFromLabel(countryReviewCount), 1);
    const otherReviewsNeeded = Math.max(0, targetReviewTotal - 1);
    const otherReviews = Array.from({ length: otherReviewsNeeded }, (_, offset) => {
      const [company, domain, stars, otherTitle, otherBody, date] = otherReviewPool[(index + offset) % otherReviewPool.length];
      return { company, domain, rating: stars, title: otherTitle, body: otherBody, date, type: "Opinión espontánea" };
    });

    return {
      id,
      reviewId,
      initials,
      name,
      country,
      reviewCount: countryReviewCount,
      displayDate,
      rating,
      title,
      body,
      experienceDate,
      sourceUrl: `https://es.trustpilot.com/reviews/${reviewId}`,
      profileUrl: `/users/?id=${encodeURIComponent(id)}&review=${encodeURIComponent(reviewId)}`,
      reviews: [
        julibenuttiReview,
        ...otherReviews
      ]
    };
  });

  window.trustpilotCloneData = profiles;
})();
