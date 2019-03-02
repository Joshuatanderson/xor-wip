       /*
	Hex Editors:
		Internet: https://hexed.it/
		Windows: HxD Hex Editor - https://mh-nexus.de/downloads/HxDSetup.zip
		Mac: 
*/

            //this function only works if it is at the top... I'm confused now.
            //Shouldn't it be hoisted, since it's a function declaration?
        function decimalByteToHex(decByte) {
            return ("0" + (decByte & 0xFF).toString(16)).slice(-2);
        }

        function decimalByteToBinary(decByte) {
            return ("00000000" + (decByte >>> 0).toString(2)).slice(-8);
        }

        function hexByteToDecimal(hexByte) {
            hexByte = hexByte.toLowerCase();
            return 16 * "0123456789abcdef".indexOf(hexByte.substr(0, 1)) + "0123456789abcdef".indexOf(hexByte.substr(1,
                1));
        }

        function toText() {
            let decryptedHexEl = document.getElementById('decryptedHex');
            let decryptedHexVal = decryptedHexEl.value;
            console.log(decryptedHexVal);

                // convert hex string to hex array
            let hexValArr = decryptedHexVal.split(' ');
            console.log(hexValArr);

                //converts hex into charCode
            let charCode = hexValArr.map(item => hexByteToDecimal(item));
            console.log(charCode);

            let textString = []
            for (let i = 0; i < charCode.length; i++) {
                //gets charCode
                let char = String.fromCharCode(charCode[i]);
                textString.push(char);
            }
            let message =textString.join('')
            document.getElementById('decryptedText').value = message;
        }

       function toHex() {
        //    alert("Under construction.");
        let originalTextEl = document.getElementById('originalText');
        let originalTextVal = originalTextEl.value;
        console.log(originalTextVal);

            //makes Char array
        let charArray = originalTextVal.split('');
        console.log(charArray);

        let hexString = ""
        for(let i = 0; i < originalTextVal.length; i++){
                //gets charCode
            let charCode = charArray[i].charCodeAt(0);
            let hex = decimalByteToHex(charCode);
            hexString += hex + " ";
        }
            document.getElementById('originalHex').value = hexString;
       }

       function toEncryptedHex() {
            //gets document elements
           let password = document.getElementById('password').value;
           let originalHex = document.getElementById('originalHex').value;
                //spot in password string
            let passwordIndex = 0;
            let xorHexString = "";

           for(let i = 0; i < originalHex.length; i += 3) {
               let hex = originalHex.substr(i, 2);
               let textNumber = hexByteToDecimal(hex);
                    //char for password at string position
               let passwordNumber = password.charCodeAt(passwordIndex);
               console.log(passwordNumber);

                    // ^ = exclusive or
               let xorNumber = textNumber ^ passwordNumber;
               let xorHex = decimalByteToHex(xorNumber);
               xorHexString += xorHex + ' ';

               passwordIndex++;
               if(passwordIndex === password.length){
                   passwordIndex = 0;
               }
           }
           document.getElementById('encryptedHex').value = xorHexString;
       }

       function decryptToHex() {
            let password = document.getElementById('password').value;
            let originalHex = document.getElementById('encryptedHex').value;
            //spot in password string
            let passwordIndex = 0;
            let xorHexString = "";

            for (let i = 0; i < originalHex.length; i += 3) {
                let hex = originalHex.substr(i, 2);
                let textNumber = hexByteToDecimal(hex);
                //char for password at string position
                let passwordNumber = password.charCodeAt(passwordIndex);
                console.log(passwordNumber);

                // ^ = exclusive or
                let xorNumber = textNumber ^ passwordNumber;
                let xorHex = decimalByteToHex(xorNumber);
                xorHexString += xorHex + ' ';

                passwordIndex++;
                if (passwordIndex === password.length) {
                    passwordIndex = 0;
                }
            document.getElementById('decryptedHex').value = xorHexString;
       }

    }
