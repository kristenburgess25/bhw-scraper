    const axios = require('axios');
    const cheerio = require('cheerio');

    const url = 'https://barrelhorseworld.com/events.asp';

    axios(url)
      .then(response => {
        const html = response.data;
        const $ = cheerio.load(html)
        const eventsTable = $('tbody > tr');
        const events = [];


        eventsTable.each(function () {

          const rowData = $(this).find('td');
          const Info = rowData.text()
          const eventTitle = $(rowData).find('a').text()
          const detailLink = $(rowData).find('a').attr('href')
          const eventDate = $(rowData).first().text()
          const eventLocation = $(rowData).last().text()
     
        
          const detailUrl = `https://barrelhorseworld.com/${detailLink}`

        // const detailUrl =  'https://barrelhorseworld.com/eventdetail.asp?ID=126020'

          axios(detailUrl)
            .then(response => {
                const html = response.data;
                const $ = cheerio.load(html)
                const detailsTable = $('tbody > tr');

                detailsTable.each(function() {
                    const rightColText = $(this).find('.text-right').text()
                    const siblings = $(this).find('.text-right').siblings().text()
                    // console.log('descriptor', rightColText, 'SIBLINGS', siblings)

                    if(rightColText === 'Description') {
                        console.log('right col sibling', siblings)
                    }
                })

                

            })

          events.push({
            title: eventTitle,
            date: eventDate,
            location: eventLocation,
            link: detailLink
          });
        });

        // console.log(events);
      })
      .catch(console.error);