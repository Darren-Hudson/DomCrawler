function runCrawler() {
    const currentDom = document.getElementById("wrapper");
    let newDom = currentDom.cloneNode(false);
    let height = 0;

    currentDom.parentNode.insertBefore(newDom, currentDom.parentNode.childNodes[0]);

    crawlDom(currentDom, newDom);
    currentDom.remove();

    console.log(newDom);
    console.log("DOM height: " + currentDom.offsetHeight);
    console.log("New DOM height: " + newDom.offsetHeight);

    function crawlDom(dom, newDomEl) {
        for (let index = 0; index < dom.children.length; index++) {
            let element = dom.children[index];

            let domRect = element.offsetHeight;

            if (element.children.length > 0) {
                let trimmedEl = element.cloneNode(false);
                newDomEl.appendChild(trimmedEl);

                domRect = 0;

                crawlDom(element, trimmedEl);
            }
            else {
                //For debugging purposes.
                element.innerHTML += " new";
                newDomEl.appendChild(element);

                index--;

                height += domRect != null ? domRect : 0;

                if(height > 50){
                    let pageBreak = document.createElement("div");
                    pageBreak.innerHTML = "Break";
                    newDomEl.insertBefore(pageBreak,element);
                    height = 0;
                }
                console.log("height: " + height);
            }

        }
    }
}