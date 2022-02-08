import Card from '../components/Card.jsx'


export default function Home({currentUser}) {
  console.log("Test deploy")
  return (
    <div className='row'>
      <Card className='col-m-4 col-t-2 col-1'/>
      <Card className='col-m-4 col-t-2 col-1'/>
      <Card className='col-m-4 col-t-2 col-1'/>
      <Card className='col-m-4 col-t-2 col-1'/>
      <Card className='col-m-4 col-t-2 col-1'/>
    </div>
  )
}
