import Card from '../components/Card.jsx'
import Router from 'next/router'
import Directions from './directions.jsx'

export default function Home({currentUser}) {
  if(typeof window !== 'undefined')Router.push('/directions')
  return null
}
