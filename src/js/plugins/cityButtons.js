import jQuery from 'jquery';
import { onLoadHtmlSuccess } from '../core/includes';
const duration = 600;

function filterByCity(city) {
    jQuery('[wm-city]').each(function (i, e) {
        const isTarget = jQuery(this).attr('wm-city') === city
            || city === null
        
        if (isTarget) {
            jQuery(this).parent().removeClass('d-none')
            jQuery(this).fadeIn(duration)
        } else {
            jQuery(this).fadeOut(duration, () =>{
                jQuery(this).parent().addClass('d-none')
            })
        }
    })
}

jQuery.fn.cityButtons = function () {
    const cities = new Set
    
    jQuery('[wm-city]').each(function (i, e) {
        cities.add(jQuery(e).attr('wm-city'))
    })

    const btns = Array.from(cities).map(city => {
        const btn = jQuery('<button>')
            .addClass(['btn', 'btn-info']).html(city)
        btn.on("click", e => filterByCity(city))
        return btn
    })

    const btnAll = jQuery('<button>').addClass(
        ['btn', 'btn-info', 'active']).html('Todas')
    
    btnAll.on("click", e => filterByCity(null))
    btns.push(btnAll)
    
    const btnGroup = jQuery('<div>').addClass('btn-group')
    btnGroup.append(btns)

    jQuery(this).html(btnGroup)
    return this
}

onLoadHtmlSuccess(function() {
    jQuery('[wm-cities-buttons]').cityButtons()
})
