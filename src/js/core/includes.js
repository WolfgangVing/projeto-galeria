import jQuery from 'jquery'

const loadHtmlSuccessCallcaks = []

export function onLoadHtmlSuccess(callback) {
    if(!loadHtmlSuccessCallcaks.includes(callback)) {
        loadHtmlSuccessCallcaks.push(callback)
    }
}

function loadIncludes(parent) {
    if(!parent) parent = 'body'
    jQuery(parent).find('[wm-include]').each(function (i, e) {
        const property = "wm-include"
        const url = jQuery(e).attr(property)
        jQuery.ajax({
            url,
            success(data) {
                jQuery(e).html(data)
                jQuery(e).removeAttr(property)

                loadHtmlSuccessCallcaks.forEach(
                    callback => callback(data))
                loadIncludes(e)
            }
        })
    })
}

loadIncludes()