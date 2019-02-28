
// From https://vanillajstoolkit.com/helpers/animate/
export const animateHelper = function (elem, animation, hide) {

	// If there's no element or animation, do nothing
	if (!elem || !animation) return

	// Remove the [hidden] attribute
	elem.classList.remove('hide')

	// Apply the animation
	elem.classList.add(animation)

	// Detect when the animation ends
	elem.addEventListener('animationend', function endAnimation (event) {

		// Remove the animation class
		elem.classList.remove(animation)

		// If the element should be hidden, hide it
		if (hide) {
			elem.classList.add('hide')
		}

		// Remove this event listener
		elem.removeEventListener('animationend', endAnimation, false)

	}, false)
}

export function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a[0];
}

export function isMobileDevice() {
	return true
  return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
}