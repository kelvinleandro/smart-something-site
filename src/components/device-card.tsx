import React, { useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from './ui/card'
import { Devices } from '@/types/devices'

const DUMMY_DATA = [
  {type: Devices.AC, name: 'AC', status: '23°C', level: 3},
  {type: Devices.CAR_LOC, name: 'Car Location', status: "23.566|12.345"},
  {type: Devices.HEADLIGHT, name: 'Headlight', status: 'ON'},
]

const DeviceCard = () => {
  return (
    <div>DeviceCard</div>
  )
}

export default DeviceCard