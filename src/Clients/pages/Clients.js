import React from 'react'
import ClientList from '../components/ClientList';

const ClientsList = () => {

  const CLIENTS = [
    {
      id: "c1",
      image:"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F28%2F13%2Fd2%2F2813d2a36b2da7711283583586bf433d.jpg&f=1&nofb=1",
      name: "Flex Lewis",
      checkins: 3

  },
    {
      id: "c2",
      image:"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.beautymuscle.net%2Fwp-content%2Fuploads%2F2016%2F02%2Fdana-linn-bailey-1455775000pc84l.jpg&f=1&nofb=1",
      name: "Dana Linn Bailey",
      checkins: 4
  },
    {
      id: "c3",
      image:"https://image.winudf.com/v2/image/Y29tLmJvZHlidWlsZGluZy5zdGV2ZWNvb2suYmlnbWFub25jYW1wdXNfc2NyZWVuXzFfMTUzMTU3MjUzMV8wMjc/screen-1.jpg?fakeurl=1&type=.jpg",
      name: "Steve Cook",
      checkins: 2

  }


]


  return (
    <ClientList items={CLIENTS}/>
  )

}

export default ClientsList;