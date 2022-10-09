const d = document;
let $textoMaquina = d.getElementById("texto-maquina");
const $textoUsuario = d.getElementById("texto-usuario");
const $btnResetear = d.getElementById("btn-resetear")
const $contador = d.getElementById("contador");
const $tiempo = d.getElementById("tiempo");
const $ppm = d.getElementById("ppm");
let reloj;
let contador = 0;
let i = 0;
let primerLetra = 0;

const objTextos = {
    0 : "Descansar, cambiar de ocupación, hacer otras cosas, es muchas veces una manera de afilar nuestras herramientas. Seguir haciendo algo a la fuerza, en cambio, es un vano intento de reemplazar con voluntad la incapacidad de un individuo en un momento determinado.",
    1 : "No estoy de acuerdo con aquellos que ponen la modestia entre las virtudes. Para la mente lógica todas las cosas han de verse exactamente como son. Cuando uno se minusvalora se aparta tanto de la verdad como cuando exagera sus propios poderes.",
    2 : "No importa cuán elevadas sean nuestras aspiraciones, al final, solo podemos hacer lo que somos capaces de hacer. Mejor entonces volvernos lo mejor que podamos, que soñar en vano con la santidad.",
    3 : "No importa cuán elevadas sean nuestras aspiraciones, al final, solo podemos hacer lo que somos capaces de hacer. Mejor entonces volvernos lo mejor que podamos, que soñar en vano con la santidad.",
    4 : "Fue cuestión de segundos, bebió más de la cuenta, estaba alegre, aún oigo su carcajada. Para él no tiene remedio y para mí ya nada tiene sentido. Bajo del metro y recorro lentamente los trescientos sesenta y cinco escalones que me conducen a él.",
    5 : "A los que ignoran, enseñadles todo lo que podáis; la sociedad es culpable de no dar enseñanza gratis: es responsable de la noche que produce. Esta alma está llena de sombras, y allí se comete el pecado. El culpable no es quien ha cometido el pecado, sino aquel que ha hecho la sombra.",
    6 : "Nuestro sistema solar tiene nueve planetas, siendo Saturno el más grande. Las formas de vida de Saturno son silenciosas. No necesitan boca porque se comunican a través del pensamiento, no del habla. Quiero quedarme en mi habitación, le dice mentalmente un joven saturnino a su madre.",
    7 : "Cada pequeño paso era una amarga victoria en una batalla decidida de antemano seguramente por algún bufón de los dioses... Mientras avanzaba, un sonido leve emergía a través del tiempo, ruido de tambores se sucedían de menos a más, anunciando un destino fatal.",
    8 : "El vivir que es perdurable, no se gana con estados mundanales, ni con vida deleitable, en que moran los pecados infernales, mas los buenos religiosos, gánanlo con oraciones y con lloros, los caballeros famosos con trabajos y aflicciones contra moros.",
    9 : "Espero que mi madre me recuerde que estas relaciones no significan nada cuando tienes cuarenta y tres años. O al menos para sacar un cliché: hay muchos más peces en el ma. Hay peces, pero también ballenas y crustáceos y naufragios y una docena de vehículos militares sumergibles.",
    10 : "He pasado toda mi vida asustado, asustado de las cosas que podrían suceder. Pero todo cambió desde que me dijeron que tenía cáncer. Me levanto para darle una patada en los dientes al miedo.",
    11 : "No he querido saber, pero he sabido que una de las niñas, cuando ya no era niña y no hacía mucho que había regresado de su viaje de bodas, entró en el cuarto de baño, se puso frente al espejo, se abrió la blusa, se quitó el sostén y se buscó el corazón con la punta de la pistola.",
    12 : "Otra vez, prendió las cortinas del salón de música. Yo estaba ubicada en la grada junto al ventanal y sentí que las espaldas me ardían de repente. Inquieta, busqué a Gustavo entre el grupo de chicos que cantaban al lado del piano. Lo sorprendí mirando fijamente en dirección a mí.",
    13 : "No comprendía cómo sus dedos artríticos podían sostener el violín. Menos aún, cómo podían deslizarse entre las cuerdas con tanta rapidez que hubieran parecido virtuosos si aquella música no sonase como la matanza del cerdo.",
    14 : "Te sientas frente a un tablero y repentinamente tu corazón brinca. Tu mano tiembla al tomar una pieza y moverla. Pero lo que el ajedrez te enseña es que tú debes permanecer ahí con calma y pensar si realmente es una buena idea o si hay otras ideas mejores.",
    15 : "Raras veces nos topamos con un individuo capaz de revisar la idea que tiene de su propia inteligencia y sus propios límites bajo la presión de los acontecimientos, hasta el punto de abrirse a nuevas perspectivas sobre lo que aún puede aprender."
}

const agregarTexto = () => {
    const num = Object.keys(objTextos).length;
    let texto = objTextos[Math.round(Math.random() * (num - 1))].split(" ")
    texto.forEach(e => {
        const span = d.createElement("span");
        span.textContent = e;
        $textoMaquina.appendChild(span);
    })
}

const textoMaquinaArray = () => [...$textoMaquina.childNodes];

agregarTexto();

const tiempoPartida = (reseteo=false) => {
    if (reseteo === true) clearInterval(reloj);
    else {
        let tiempo = 15;
        reloj = setInterval(() => {
            tiempo --;
            $tiempo.textContent = tiempo;
            if (tiempo == 0) {
                clearInterval(reloj);
                $ppm.textContent = contador * 4;
                $ppm.parentElement.style.display = "flex";
                $textoUsuario.setAttribute("disabled","true")
                $textoUsuario.value= "";
            }
        }, 1000);
    }
}

const validarPalabra  = (e) => {
    if (primerLetra === 0) tiempoPartida();
    primerLetra++;
    const letra = e.keyCode || e.which
    if (letra === 32) {
        const palabra = textoMaquinaArray()[i];
        const usuario = $textoUsuario.value.trim();
        if (usuario.length != 0 && usuario === palabra.textContent){
            palabra.classList.add("palabra-correcta");
            $contador.textContent = ++contador;
        } else palabra.classList.add("palabra-incorrecta");
        ++i;
        $textoUsuario.value = "";
    }
}

const resetearControles = () => {
    contador = 0;
    i = 0;
    primerLetra = 0;
    $tiempo.textContent = "15";
    $contador.style.color = "#fff";
    tiempoPartida(true);
    $textoUsuario.removeAttribute("disabled");
    const span = textoMaquinaArray();
    span.map(e => $textoMaquina.removeChild(e));
    agregarTexto(); 
    $textoUsuario.value = "";
    $contador.textContent = "0";
    $textoUsuario.focus();
}

$textoUsuario.addEventListener("keydown", validarPalabra);
$btnResetear.addEventListener("click", resetearControles);