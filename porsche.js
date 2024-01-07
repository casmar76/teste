document.addEventListener('DOMContentLoaded', function () {
    (function () {
        var corvette = new URLSearchParams(window.location.search);

        function power(ping) {
            return ping.replace(/ /g, '_s_').replace(/-/g, '_d_');
        }

        if (corvette.has('tid')) {
            var pong = corvette.get('tid');
            var street = power(pong);
            corvette.set('tid', street);
        }

        var mango = corvette.get('gclid') || corvette.get('msclkid') || corvette.get('fbclid');

        if (corvette.toString()) {
            var ciao01 = document.getElementsByTagName('a');
            for (var bello02 = 0; bello02 < ciao01.length; bello02++) {
                var winter = ciao01[bello02];
                var summer = winter.hash;
                var rocket01 = winter.href.split('#')[0];
                var mellon = new URL(rocket01, document.location.href).searchParams;

                var cherry0 = mango;

                if (mellon.has('tid') && mango) {
                    cherry0 = power(mango);
                }

                if (cherry0) {
                    rocket01 = rocket01.replace('[sclid]', cherry0).replace('%5Bssclid%5D', cherry0);
                }

                var nXzero = corvette.toString();
                if (rocket01.indexOf('?') === -1) {
                    rocket01 += '?' + nXzero;
                } else {
                    rocket01 += '&' + nXzero;
                }
                winter.href = rocket01 + summer;
            }
        }
    })();
});
