document.addEventListener('DOMContentLoaded', () => {
    (function () {
        const urlParams = new URLSearchParams(window.location.search);
        const scriptTag = document.querySelector('script[data-origin-url]');
        const originUrl = scriptTag ? scriptTag.getAttribute('data-origin-url') : null;

        // Generic function to store click IDs in local storage
        const clickIdTypes = ['gclid', 'wbraid', 'msclkid', 'fbclid'];
        let clickId = null;

        clickIdTypes.forEach(idType => {
            if (urlParams.has(idType)) {
                clickId = urlParams.get(idType);
                localStorage.setItem('clickId', clickId);
            }
        });

        // Retrieve clickId from local storage if not in the URL
        clickId = clickId || localStorage.getItem('clickId');

        // Get values of 'clickId' or UTM parameters from the URL
        const adCampaignId = clickId || urlParams.get('utm_source') || urlParams.get('utm_medium') || urlParams.get('utm_campaign') || 
                             urlParams.get('utm_term') || urlParams.get('utm_content');
        let modifiedCampaignId = adCampaignId;

        // If 'tid' parameter exists, use it directly without any replacements
        if (urlParams.has('tid')) {
            modifiedCampaignId = urlParams.get('tid');
        }

        // Create the updated URL parameters string
        const updatedUrlParamsString = urlParams.toString();

        if (updatedUrlParamsString) {
            const pageLinks = document.querySelectorAll('a');

            pageLinks.forEach((link) => {
                const anchorHash = link.hash;
                let linkHref = link.href.split('#')[0];

                // Replace placeholders with the value of 'modifiedCampaignId' in the link
                if (modifiedCampaignId) {
                    linkHref = linkHref.replace('[sclid]', modifiedCampaignId).replace('%5Bsclid%5D', modifiedCampaignId);
                }

                // Append or update URL parameters in the link
                if (!linkHref.includes('?')) {
                    linkHref += '?' + updatedUrlParamsString;
                } else {
                    linkHref += '&' + updatedUrlParamsString;
                }

                // Update the href attribute of the link
                link.href = linkHref + anchorHash;
            });

            // Send the click ID to the server
            if (adCampaignId && originUrl) {
                const ajaxUrl = `${originUrl}/wp-admin/admin-ajax.php?action=track_click`;
                fetch(ajaxUrl, {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ clickId: adCampaignId }),
                })
                .catch(error => {
                    console.error('Error sending click ID to server:', error);
                });
            }
        }
    })();
});
