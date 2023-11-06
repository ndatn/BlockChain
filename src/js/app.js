App = {
  web3Provider: null,
  contracts: {},

  init: async function () {
    $.getJSON('../books.json', function (data) {
      var booksRow = $('#booksRow');
      var bookTemplate = $('#bookTemplate');

      for (var i = 0; i < data.length; i++) {
        bookTemplate.find('.panel-title').text(data[i].name);
        bookTemplate.find('img').attr('src', data[i].picture);
        bookTemplate.find('.book-category').text(data[i].category);
        bookTemplate.find('.book-year').text(data[i].year);
        bookTemplate.find('.book-author').text(data[i].author);
        bookTemplate.find('.btn-adopt').attr('data-id', data[i].id);

        booksRow.append(bookTemplate.html());
      }
    });
    return await App.initWeb3();
  },

  initWeb3: async function () {
    if (window.ethereum) {
      App.web3Provider = window.ethereum;
      try {
        await window.ethereum.enable();
      } catch (error) {
        console.error('User denied account access');
      }
    } else if (window.web3) {
      App.web3Provider = window.web3.currentProvider;
    } else {
      App.web3Provider = new Web3.providers.HttpProvider(
        'http://localhost:8545'
      );
    }
    web3 = new Web3(App.web3Provider);
    return App.initContract();
  },

  initContract: function () {
    $.getJSON('Adoption.json', function (data) {
      var AdoptionArtifact = data;
      App.contracts.Adoption = TruffleContract(AdoptionArtifact);

      App.contracts.Adoption.setProvider(App.web3Provider);

      return App.markAdopted();
    });

    return App.bindEvents();
  },

  bindEvents: function () {
    $(document).on('click', '.btn-adopt', App.handleAdopt);
  },

  markAdopted: function () {
    return App.contracts.Adoption.deployed()
      .then(function (instance) {
        var adoptionInstance = instance;
        return adoptionInstance.getAdopters.call();
      })
      .then(function (adopters) {
        for (var i = 0; i < adopters.length; i++) {
          if (adopters[i] !== '0x0000000000000000000000000000000000000000') {
            $('.panel-book')
              .eq(i)
              .find('button')
              .text('Success')
              .attr('disabled', true);
          }
        }
      })
      .catch(function (err) {
        console.log(err.message);
      });
  },

  handleAdopt: function (event) {
    event.preventDefault();
    var bookId = parseInt($(event.target).data('id'));
    var adoptionInstance;

    web3.eth.getAccounts(function (error, accounts) {
      if (error) {
        console.log(error);
      }
      var account = accounts[0];
      App.contracts.Adoption.deployed()
        .then(function (instance) {
          adoptionInstance = instance;

          return adoptionInstance.adopt(bookId, { from: account });
        })
        .then(function (result) {
          return App.markAdopted();
        })
        .catch(function (err) {
          console.log(err.message);
        });
    });
  },
};

$(document).ready(function () {
  App.init();
});
