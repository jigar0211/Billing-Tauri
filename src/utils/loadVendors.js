export const loadVendorFiles = () => {
    const vendorScripts = [
        "./assets/js/dashboard.js",
    ];

    const vendorStyles = [
        "./assets/css/dashboard.css",
        "./assets/css/font-awesome.min.css",
    ];

    vendorStyles.forEach((href) => {
        if (!document.querySelector(`link[href="${href}"]`)) {
            const link = document.createElement("link");
            link.href = href;
            link.rel = "stylesheet";
            document.head.appendChild(link);
        }
    });

    vendorScripts.forEach((src) => {
        if (!document.querySelector(`script[src="${src}"]`)) {
            const script = document.createElement("script");
            script.src = src;
            document.body.appendChild(script);
        }
    });
};
