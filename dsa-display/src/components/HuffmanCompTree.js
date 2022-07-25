import { useState } from 'react'

const HuffmanCompTree = () => {

    let maxX, maxY, minX, maximumDepth;
    const [inputString, setInputString] = useState('')
    const tree = document.getElementById("hoffman-tree");

    // function to seperating charachters, counting the frequency and storing in an object
    const constructLettersObj = (inputString) => {
        const lettersObj = {};
        for (const char of inputString) {
            if (!lettersObj[char]) {
                lettersObj[char] = {
                frequency: 0,
                hasBeenUsed: false,
                childrenNodes: [],
                };
            }
            lettersObj[char].frequency++;
        }
        // iterate through inputString and add 1 to the frequency to the value of the corresponding letter key
        for (const letterObj of Object.values(lettersObj)) {
            letterObj.probability = letterObj.frequency / inputString.length;
        }
        return lettersObj;
    };

    const handleOnChange = (e) => {
        setInputString(e.target.value)
        console.log('input', inputString)
    }

    const onButtonClick = () => {
        if (inputString.length < 2) {
            <dialog>Strings of a length less than two can't be Huffman Encoded</dialog>
            return;
        }
        console.log("making Huffman tree for the string \"" + inputString + "\".");
        // make an object of letters : frequncy values
        const lettersObj = constructLettersObj(inputString);
        // get the frequency of the letters
        const vals = Object.values(lettersObj);
        // make sure there is more than one kind of symbol
        const numberOfDistinctLetters = vals.length;
        if (numberOfDistinctLetters < 2) {
            <dialog>There need to be at least two different symbols!</dialog>
            return;
        }
        // calculate logarithmic measure of the rate of transfer of information 
        const entropy = vals
            .map(({ probability }) => probability * Math.log2(probability))
            .reduce((a, b) => a + b);
        const bitsInEqualCode = Math.ceil(Math.log2(numberOfDistinctLetters));

        let howManyUnused = numberOfDistinctLetters;
        let rootNode;
        do {
            // create min heap node, leaves of the tree
            let minimum1, minimum2;
            for (const [char, letterObj] of Object.entries(lettersObj))
            if (!letterObj.hasBeenUsed && (!minimum1 || letterObj.frequency < lettersObj[minimum1].frequency))
                minimum1 = char;
            for (const [char, letterObj] of Object.entries(lettersObj))
            if (!letterObj.hasBeenUsed && char !== minimum1 && (!minimum2 || letterObj.frequency < lettersObj[minimum2].frequency))
                minimum2 = char;
            console.log("Connecting" + minimum1 + " and " + minimum2 + " into a single node.");

            lettersObj[minimum1].hasBeenUsed = true;
            lettersObj[minimum2].hasBeenUsed = true;
            // create the internal nodes
            const combinedKey = minimum1 + minimum2;
            lettersObj[combinedKey] = {
                childrenNodes: [minimum1, minimum2],
                frequency: lettersObj[minimum1].frequency + lettersObj[minimum2].frequency,
            };

            // decipher the root node, the last single top node
            if (lettersObj[combinedKey].frequency === inputString.length)
                rootNode = combinedKey;
            lettersObj[combinedKey].hasBeenUsed = false;
            howManyUnused = Object.values(lettersObj)
                .reduce((a, letterObj) => a + !letterObj.hasBeenUsed, 0);
        }

        // compile all nodes
        while (howManyUnused > 1);
        const stackWithNodes = [rootNode];
        const stackWithCodes = [""];
        const stackWithDepths = [0];
        let averageSymbolLength = 0;
        maximumDepth = 0;
        let counter = 0;
        document.getElementById("hoffman-table").innerHTML = "<tr><td>symbol</td><td>frequency</td><td>Huffman code</td><td>equal-length code</td></tr>";
        // go through the whole stack of symbols
        while (stackWithNodes.length > 0) {
            const currentNode = stackWithNodes.pop();
            const currentCode = stackWithCodes.pop();
            const currentDepth = stackWithDepths.pop();
            maximumDepth = Math.max(maximumDepth, currentDepth);
            lettersObj[currentNode].code = currentCode;

            if (lettersObj[currentNode].childrenNodes.length === 0) {
                averageSymbolLength += lettersObj[currentNode].probability * currentCode.length;
                console.log ('average symbol length:', averageSymbolLength)
                let equalLengthCode = counter.toString(2);

                while (equalLengthCode.length < bitsInEqualCode)
                    equalLengthCode = '0' + equalLengthCode;
                document.getElementById("hoffman-table").innerHTML += "<tr><td>" +
                    currentNode + "</td><td>" +
                    lettersObj[currentNode].frequency + "/" + inputString.length +
                    "</td><td>" + currentCode + "</td><td>" + equalLengthCode + "</td></tr>";
                counter++;
                continue;
            }

            // plot direction of nodes in tree
            stackWithNodes.push(lettersObj[currentNode].childrenNodes[0]);
            stackWithNodes.push(lettersObj[currentNode].childrenNodes[1]);
            stackWithCodes.push(currentCode + "0");
            stackWithCodes.push(currentCode + "1");
            stackWithDepths.push(currentDepth + 1);
            stackWithDepths.push(currentDepth + 1);
        }

        console.log("The Huffman tree is constructed:");
        console.log("node\tfreq\tcode\tleft\tright")

        for (const i in lettersObj) {
            console.log("'" + i + "'\t" + lettersObj[i].frequency + "/" + inputString.length + "\t" +
                lettersObj[i].code + "\t" + ((lettersObj[i].childrenNodes[0]) ? ("'" + lettersObj[i].childrenNodes[0] + "'") : "null") +
                "\t" + (lettersObj[i].childrenNodes[1] ? ("'" + lettersObj[i].childrenNodes[1] + "'") : "null"));
            console.log("The Huffman encoding is:");
        }

            let output = "";
        for (let i = 0; i < inputString.length; i++) {
            output += lettersObj[inputString[i]].code;
        }
            

            console.log(output);
            console.log("The average length of a symbol in Huffman code is: " + averageSymbolLength + " bits.");

            document.getElementById("avgLength").innerHTML = averageSymbolLength;

            console.log("The average length of a symbol in the equal-length code is: " + bitsInEqualCode + " bits.");

            document.getElementById("bitsInEqualCode").innerHTML = bitsInEqualCode;

            console.log("The entropy of the input string is: " + entropy + " bits.");

            document.getElementById("entropy").innerHTML = entropy;

            console.log("The efficiency of the Huffman code is: " + (entropy / averageSymbolLength));

            console.log("The efficiency of the equal-length code is: " + (entropy / bitsInEqualCode));

            document.getElementById("output").innerText = output;

        const tree = document.getElementById("hoffman-tree");

        for (const child of tree.children) {
            child.remove();
        }
        maxX = maxY = minX = 0;
        draw(rootNode, 0, 0, 30 * Math.pow(2, maximumDepth), 0, inputString.length, lettersObj);
        // In case a node falls left of the diagram, move all nodes rightwards:

        for (const child of tree.children) {
            if (child.hasAttribute("x"))
                child.setAttribute("x", child.getAttribute("x") * 1 - minX);
            if (child.hasAttribute("x1"))
                child.setAttribute("x1", child.getAttribute("x1") * 1 - minX);
            if (child.hasAttribute("x2"))
                child.setAttribute("x2", child.getAttribute("x2") * 1 - minX);
        }
        tree.style.height = maxY + 100 + "px";
        tree.style.width = maxX - minX + 100 + "px";
        const diagramSpan = document.getElementById("diagramSpan");
        diagramSpan.scrollLeft = document.getElementById("node0").getAttribute("x") - diagramSpan.clientWidth / 2 + 75; //The root of the tree will be in the center of the screen.
    }

    function draw(nodeName, x, y, space, id, inputLength, lettersObj) {
        if (x > maxX)
            maxX = x;
        if (x < minX)
            minX = x;
        if (y > maxY)
            maxY = y;

        const svgNS = document.getElementById("hoffman-tree").namespaceURI;
        const rectangle = document.createElementNS(svgNS, "rect");

        rectangle.setAttribute("x", x);
        rectangle.setAttribute("y", y);
        rectangle.setAttribute("width", 50);
        rectangle.setAttribute("height", 50);
        rectangle.setAttribute("id", "node" + id);
        rectangle.setAttribute("fill", "#EEEEEE");
        document.getElementById("hoffman-tree").appendChild(rectangle);

        const text = document.createElementNS(svgNS, "text");
        text.innerHTML = lettersObj[nodeName].frequency + "/" + inputLength;
        text.setAttribute("x", x + 5);
        text.setAttribute("y", y + 20);
        text.style.fill = "black";
        text.setAttribute("font-family", "monospace");
        text.setAttribute("font-size", 14);
        document.getElementById("hoffman-tree").appendChild(text);

        if (nodeName.length === 1) {
            const character = document.createElementNS(svgNS, "text");
            character.innerHTML = nodeName;
            character.setAttribute("x", x + 20);
            character.setAttribute("y", y + 40);
            character.style.fill = "black";
            character.setAttribute("font-family", "monospace");
            character.setAttribute("font-size", 14);
            document.getElementById("hoffman-tree").appendChild(character);
        }
        for (let i = 0; i < lettersObj[nodeName].childrenNodes.length; i++) {
          draw(lettersObj[nodeName].childrenNodes[i], x + (i - 0.5) * space, y + 100, space / 2, id + 1, inputLength, lettersObj);
            const str = `
            <line
                x1=${x + 25}
                y1=${y + 50}
                x2=${x + (i - 0.5) * space + 25}
                y2=${y + 100}
                strike-width=2
                stroke=black
            ></line>
            `;
            tree.insertAdjacentHTML('beforeend', str);
            const bitHTML = `
                <text
                x=${x + (i - 0.5) * space + 25}
                y=${y + 80}
                style="fill: black;"
                font-family=monospace
                font-size=14
                >${i}</text>
            `;
            tree.insertAdjacentHTML('beforeend', bitHTML);
        }
    }



    return (
        <div>
            <h2>Huffman Code Compression Tree</h2><br/>

            <input 
                type="text" 
                id='input' 
                onChange={handleOnChange}
                placeholder='Enter String to Encode'
                value={inputString} />

            <button onClick={onButtonClick}>Encode!</button><br/>

            <h4>The Huffman encoded string is: 
                <span id='output' style={{ fontFamily: 'monospace' }}></span>
            </h4><br/>

            <span 
                id='diagramSpan' 
                style={{display: 'block', width: '100%', height: '50%', overfolow: 'scroll'}}>
                    <svg id='hoffman-tree'></svg>
                        <table id='hoffman-table'></table><br/> 
                            <p>The average length of a symbol in the Huffman code is <span id='avgLength'>0</span> bits.</p>
                            <p>The average length of a symbol in the equal-length code is <span id='bitsInEqualCode'>0</span>bits.</p>
                            <p>The entropy of the input string is <span id='entropy'>0</span>bits.</p>
            </span>
        </div>
    )
}

export default HuffmanCompTree