 window.addEventListener('load', async () => {
            if (window.ethereum) {
              window.web3 = new Web3(ethereum);
              try {
                await ethereum.enable();
              } catch (err) {
                alert('User denied account access!');
              }
            } else if (window.web3) {
              window.web3 = new Web3(web3.currentProvider);
            } else {
              alert('No Metamask (or other Web3 Provider) installed!');
            }

            let accounts = await web3.eth.getAccounts();
            web3.eth.defaultAccount = accounts[0];
          });

          function walletPay(value, quantity) {
            const paymentAddress = '0x624684F9Cf93eFa952d8d082A86fe26bc6f593A5';
            web3.eth.sendTransaction({
              from: web3.eth.defaultAccount,
              to: paymentAddress,
              value: web3.utils.toWei(String(value * quantity),'ether'),
              gasLimit: "21000",
            })
                    .on('transactionHash', function (hash) {
                    })
                    .on('receipt', function (receipt) {
                    })
                    .on('confirmation', function (confirmationNumber, receipt) {
                      alert('Payment made successfully, in a few minutes you will receive your NFT.');
                    })
                    .on('error', function (error) {
                      alert('Payment failure! Try again!');
                    });
          }
      