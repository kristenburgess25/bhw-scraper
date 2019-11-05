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
     
        
        //   const detailUrl = `https://barrelhorseworld.com/${detailLink}`

        const detailUrl =  'https://barrelhorseworld.com/eventdetail.asp?ID=126020'

          axios(detailUrl)
            .then(response => {
                const html = response.data;
                const $ = cheerio.load(html)
                const detailsTable = $('tbody > tr');
                const rightColText = $(detailsTable).find('.text-right').text()
                // if(rightColText == 'When') {
                //     let sibling 
                //     console.log
                // }
                // console.log('TEXT RIGHT', rightCol)
            })

          events.push({
            title: eventTitle,
            date: eventDate,
            location: eventLocation,
            link: detailLink
          });
        });

        console.log(events);
      })
      .catch(console.error);