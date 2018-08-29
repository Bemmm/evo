import { Component } from '@angular/core';
import { } from 'googlemaps';
import { Router } from '@angular/router';
@Component({
  selector: 'evo-landing',
  templateUrl: 'landing.component.html',
  styleUrls: ['landing.component.scss']
})

export class LandingComponent {
  loggedUser: any;
  searchModel: any = {};
  helperModel: any = {
    label: '',
    latitude: 0,
    longitude: 0,
    zoom: 4
  };
  searchOptions: any = [
    {
      value: 'location',
      label: 'Визначити моє місцезнаходження',
      image: 'data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDUxLjYzNiA1MS42MzYiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxLjYzNiA1MS42MzY7IiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iNTEycHgiIGhlaWdodD0iNTEycHgiPgo8cGF0aCBkPSJNNTEuMzUzLDAuOTE0Yy0wLjI5NS0wLjMwNS0wLjc1LTAuMzktMS4xMzUtMC4yMTNMMC41ODMsMjMuNDgxYy0wLjM5OSwwLjE4NC0wLjYzMiwwLjYwNS0wLjU3NCwxLjA0MSAgczAuMzkzLDAuNzgyLDAuODI2LDAuODU0bDIyLjI2MywzLjczMWwyLjU0NSwyMS4wMzhjMC4wNTQsMC40MzgsMC4zODksMC43OTEsMC44MjQsMC44NjVjMC4wNTcsMC4wMSwwLjExMywwLjAxNSwwLjE2OSwwLjAxNSAgYzAuMzc1LDAsMC43MjYtMC4yMTEsMC44OTYtMC41NTZsMjQtNDguNDE1QzUxLjcyLDEuNjc1LDUxLjY0OCwxLjIxOCw1MS4zNTMsMC45MTR6IiBmaWxsPSIjNTlkMzg5Ii8+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo='
    },
    {
      value: 'address',
      label: 'Вказати адресу',
      image: 'data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjE2cHgiIGhlaWdodD0iMTZweCI+CjxnPgoJPGc+CgkJPHBhdGggZD0iTTUwNi41NTUsMjA4LjA2NEwyNjMuODU5LDMwLjM2N2MtNC42OC0zLjQyNi0xMS4wMzgtMy40MjYtMTUuNzE2LDBMNS40NDUsMjA4LjA2NCAgICBjLTUuOTI4LDQuMzQxLTcuMjE2LDEyLjY2NS0yLjg3NSwxOC41OTNzMTIuNjY2LDcuMjE0LDE4LjU5MywyLjg3NUwyNTYsNTcuNTg4bDIzNC44MzcsMTcxLjk0M2MyLjM2OCwxLjczNSw1LjEyLDIuNTcsNy44NDgsMi41NyAgICBjNC4wOTYsMCw4LjEzOC0xLjg4NSwxMC43NDQtNS40NDVDNTEzLjc3MSwyMjAuNzI5LDUxMi40ODMsMjEyLjQwNSw1MDYuNTU1LDIwOC4wNjR6IiBmaWxsPSIjNTlkMzg5Ii8+Cgk8L2c+CjwvZz4KPGc+Cgk8Zz4KCQk8cGF0aCBkPSJNNDQyLjI0NiwyMzIuNTQzYy03LjM0NiwwLTEzLjMwMyw1Ljk1Ni0xMy4zMDMsMTMuMzAzdjIxMS43NDlIMzIyLjUyMVYzNDIuMDA5YzAtMzYuNjgtMjkuODQyLTY2LjUyLTY2LjUyLTY2LjUyICAgIHMtNjYuNTIsMjkuODQyLTY2LjUyLDY2LjUydjExNS41ODdIODMuMDU4VjI0NS44NDdjMC03LjM0Ny01Ljk1Ny0xMy4zMDMtMTMuMzAzLTEzLjMwM3MtMTMuMzAzLDUuOTU2LTEzLjMwMywxMy4zMDN2MjI1LjA1MyAgICBjMCw3LjM0Nyw1Ljk1NywxMy4zMDMsMTMuMzAzLDEzLjMwM2gxMzMuMDI5YzYuOTk2LDAsMTIuNzIxLTUuNDA1LDEzLjI1MS0xMi4yNjdjMC4wMzItMC4zMTEsMC4wNTItMC42NTEsMC4wNTItMS4wMzZ2LTEyOC44OSAgICBjMC0yMi4wMDksMTcuOTA1LTM5LjkxNCwzOS45MTQtMzkuOTE0czM5LjkxNCwxNy45MDYsMzkuOTE0LDM5LjkxNHYxMjguODljMCwwLjM4MywwLjAyLDAuNzE3LDAuMDUyLDEuMDI0ICAgIGMwLjUyNCw2Ljg2Nyw2LjI1MSwxMi4yNzksMTMuMjUxLDEyLjI3OWgxMzMuMDI5YzcuMzQ3LDAsMTMuMzAzLTUuOTU2LDEzLjMwMy0xMy4zMDNWMjQ1Ljg0NyAgICBDNDU1LjU0OSwyMzguNDk5LDQ0OS41OTMsMjMyLjU0Myw0NDIuMjQ2LDIzMi41NDN6IiBmaWxsPSIjNTlkMzg5Ii8+Cgk8L2c+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg=='
    },
    {
      value: 'city',
      label: 'Вказати насеений пункт',
      image: 'data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjE2cHgiIGhlaWdodD0iMTZweCI+CjxnPgoJPGc+CgkJPGc+CgkJCTxwYXRoIGQ9Ik00ODAuMzYsNDk0Ljc0MmgtMTQuMzgyVjQzLjE0NmMwLTQuNzY3LTMuODY0LTguNjI5LTguNjI5LTguNjI5SDI5Ni4yN2MtNC43NjYsMC04LjYyOSwzLjg2Mi04LjYyOSw4LjYyOXYzNy4zOTMgICAgIGgtMTcuMjU4VjQzLjE0NmMwLTQuNzY3LTMuODY0LTguNjI5LTguNjI5LTguNjI5SDIyNC4zNlY4LjYyOWMwLTQuNzY3LTMuODY0LTguNjI5LTguNjI5LTguNjI5cy04LjYyOSwzLjg2Mi04LjYyOSw4LjYyOXYyNS44ODggICAgIGgtMzcuMzkzYy00Ljc2NiwwLTguNjI5LDMuODYyLTguNjI5LDguNjI5djM3LjM5M2gtMjUuODg4Yy00Ljc2NiwwLTguNjI5LDMuODYyLTguNjI5LDguNjI5djcxLjkxaC03MS45MSAgICAgYy00Ljc2NiwwLTguNjI5LDMuODYyLTguNjI5LDguNjI5djMyNS4wMzRIMzEuNjRjLTQuNzY2LDAtOC42MjksMy44NjItOC42MjksOC42MjlTMjYuODc1LDUxMiwzMS42NCw1MTJINDgwLjM2ICAgICBjNC43NjYsMCw4LjYyOS0zLjg2Miw4LjYyOS04LjYyOVM0ODUuMTI1LDQ5NC43NDIsNDgwLjM2LDQ5NC43NDJ6IE0xNzguMzM3LDUxLjc3NWg3NC43ODZ2MjguNzY0aC03NC43ODZWNTEuNzc1eiAgICAgIE0xNDkuNTczLDQ5NC43NDJoLTUuNzUzVjQ4MC4zNmMwLTQuNzY3LTMuODY0LTguNjI5LTguNjI5LTguNjI5cy04LjYyOSwzLjg2Mi04LjYyOSw4LjYyOXYxNC4zODJoLTUuNzUzdi0yOC43NjRoMjguNzY0ICAgICBWNDk0Ljc0MnogTTIwNy4xMDEsMjczLjI1OHYxNC44NDV2MjA2LjYzOWgtNDAuMjd2LTM3LjM5M2MwLTQuNzY3LTMuODY0LTguNjI5LTguNjI5LTguNjI5SDExMi4xOCAgICAgYy00Ljc2NiwwLTguNjI5LDMuODYyLTguNjI5LDguNjI5djM3LjM5M2gtNDAuMjdWMTc4LjMzN2gxNDMuODJWMjczLjI1OHogTTIxNS43MywxNjEuMDc5aC03MS45MVY5Ny43OThoMTQzLjgydjE2Ni44MzFIMjI0LjM2ICAgICB2LTI4Ljc2NGgyNS44ODhjNC43NjYsMCw4LjYyOS0zLjg2Miw4LjYyOS04LjYyOXMtMy44NjQtOC42MjktOC42MjktOC42MjlIMjI0LjM2di0yOC43NjRoMjUuODg4ICAgICBjNC43NjYsMCw4LjYyOS0zLjg2Miw4LjYyOS04LjYyOXMtMy44NjQtOC42MjktOC42MjktOC42MjlIMjI0LjM2di0yLjg3NkMyMjQuMzYsMTY0Ljk0MSwyMjAuNDk2LDE2MS4wNzksMjE1LjczLDE2MS4wNzl6ICAgICAgTTM2OC4xOCw0OTQuNzQySDIyNC4zNlYyODguMTAzdi02LjIxNWgxNDMuODJWNDk0Ljc0MnogTTQ0OC43MTksNDk0Ljc0MmgtNjMuMjgxVjI3My4yNTh2LTExLjUwNiAgICAgYzAtNC43NjctMy44NjQtOC42MjktOC42MjktOC42MjlzLTguNjI5LDMuODYyLTguNjI5LDguNjI5djIuODc2aC0xNy4yNTh2LTIuODc2YzAtNC43NjctMy44NjQtOC42MjktOC42MjktOC42MjkgICAgIHMtOC42MjksMy44NjItOC42MjksOC42Mjl2Mi44NzZoLTI4Ljc2NFY4OS4xNjlWNTEuNzc1aDE0My44MlY0OTQuNzQyeiIgZmlsbD0iIzU5ZDM4OSIvPgoJCQk8cGF0aCBkPSJNMjYxLjc1Myw0NzcuNDg1YzQuNzY2LDAsOC42MjktMy44NjQsOC42MjktOC42MjlWMzA3Ljc3OGMwLTQuNzY3LTMuODY0LTguNjI5LTguNjI5LTguNjI5cy04LjYyOSwzLjg2Mi04LjYyOSw4LjYyOSAgICAgdjE2MS4wNzlDMjUzLjEyNCw0NzMuNjIyLDI1Ni45ODcsNDc3LjQ4NSwyNjEuNzUzLDQ3Ny40ODV6IiBmaWxsPSIjNTlkMzg5Ii8+CgkJCTxwYXRoIGQ9Ik0yOTYuMjcsNDc3LjQ4NWM0Ljc2NiwwLDguNjI5LTMuODY0LDguNjI5LTguNjI5VjMwNy43NzhjMC00Ljc2Ny0zLjg2NC04LjYyOS04LjYyOS04LjYyOXMtOC42MjksMy44NjItOC42MjksOC42MjkgICAgIHYxNjEuMDc5QzI4Ny42NCw0NzMuNjIyLDI5MS41MDQsNDc3LjQ4NSwyOTYuMjcsNDc3LjQ4NXoiIGZpbGw9IiM1OWQzODkiLz4KCQkJPHBhdGggZD0iTTMzMC43ODYsNDc3LjQ4NWM0Ljc2NiwwLDguNjI5LTMuODY0LDguNjI5LTguNjI5VjMwNy43NzhjMC00Ljc2Ny0zLjg2NC04LjYyOS04LjYyOS04LjYyOXMtOC42MjksMy44NjItOC42MjksOC42MjkgICAgIHYxNjEuMDc5QzMyMi4xNTcsNDczLjYyMiwzMjYuMDIxLDQ3Ny40ODUsMzMwLjc4Niw0NzcuNDg1eiIgZmlsbD0iIzU5ZDM4OSIvPgoJCQk8cGF0aCBkPSJNMzQyLjI5MiwxMDkuMzAzYzQuNzY2LDAsOC42MjktMy44NjIsOC42MjktOC42MjlWODkuMTY5YzAtNC43NjctMy44NjQtOC42MjktOC42MjktOC42MjlzLTguNjI5LDMuODYyLTguNjI5LDguNjI5ICAgICB2MTEuNTA2QzMzMy42NjMsMTA1LjQ0MSwzMzcuNTI2LDEwOS4zMDMsMzQyLjI5MiwxMDkuMzAzeiIgZmlsbD0iIzU5ZDM4OSIvPgoJCQk8cGF0aCBkPSJNMzc2LjgwOSwxMDkuMzAzYzQuNzY2LDAsOC42MjktMy44NjIsOC42MjktOC42MjlWODkuMTY5YzAtNC43NjctMy44NjQtOC42MjktOC42MjktOC42MjlzLTguNjI5LDMuODYyLTguNjI5LDguNjI5ICAgICB2MTEuNTA2QzM2OC4xOCwxMDUuNDQxLDM3Mi4wNDMsMTA5LjMwMywzNzYuODA5LDEwOS4zMDN6IiBmaWxsPSIjNTlkMzg5Ii8+CgkJCTxwYXRoIGQ9Ik00MTEuMzI2LDEwOS4zMDNjNC43NjYsMCw4LjYyOS0zLjg2Miw4LjYyOS04LjYyOVY4OS4xNjljMC00Ljc2Ny0zLjg2NC04LjYyOS04LjYyOS04LjYyOXMtOC42MjksMy44NjItOC42MjksOC42MjkgICAgIHYxMS41MDZDNDAyLjY5NywxMDUuNDQxLDQwNi41NiwxMDkuMzAzLDQxMS4zMjYsMTA5LjMwM3oiIGZpbGw9IiM1OWQzODkiLz4KCQkJPHBhdGggZD0iTTM0Mi4yOTIsMTY2LjgzMWM0Ljc2NiwwLDguNjI5LTMuODYyLDguNjI5LTguNjI5di0xMS41MDZjMC00Ljc2Ny0zLjg2NC04LjYyOS04LjYyOS04LjYyOXMtOC42MjksMy44NjItOC42MjksOC42MjkgICAgIHYxMS41MDZDMzMzLjY2MywxNjIuOTY5LDMzNy41MjYsMTY2LjgzMSwzNDIuMjkyLDE2Ni44MzF6IiBmaWxsPSIjNTlkMzg5Ii8+CgkJCTxwYXRoIGQ9Ik0zNzYuODA5LDE2Ni44MzFjNC43NjYsMCw4LjYyOS0zLjg2Miw4LjYyOS04LjYyOXYtMTEuNTA2YzAtNC43NjctMy44NjQtOC42MjktOC42MjktOC42MjlzLTguNjI5LDMuODYyLTguNjI5LDguNjI5ICAgICB2MTEuNTA2QzM2OC4xOCwxNjIuOTY5LDM3Mi4wNDMsMTY2LjgzMSwzNzYuODA5LDE2Ni44MzF6IiBmaWxsPSIjNTlkMzg5Ii8+CgkJCTxwYXRoIGQ9Ik00MTEuMzI2LDE2Ni44MzFjNC43NjYsMCw4LjYyOS0zLjg2Miw4LjYyOS04LjYyOXYtMTEuNTA2YzAtNC43NjctMy44NjQtOC42MjktOC42MjktOC42MjlzLTguNjI5LDMuODYyLTguNjI5LDguNjI5ICAgICB2MTEuNTA2QzQwMi42OTcsMTYyLjk2OSw0MDYuNTYsMTY2LjgzMSw0MTEuMzI2LDE2Ni44MzF6IiBmaWxsPSIjNTlkMzg5Ii8+CgkJCTxwYXRoIGQ9Ik0zNDIuMjkyLDIyNC4zNmM0Ljc2NiwwLDguNjI5LTMuODYyLDguNjI5LTguNjI5di0xMS41MDZjMC00Ljc2Ny0zLjg2NC04LjYyOS04LjYyOS04LjYyOXMtOC42MjksMy44NjItOC42MjksOC42MjkgICAgIHYxMS41MDZDMzMzLjY2MywyMjAuNDk3LDMzNy41MjYsMjI0LjM2LDM0Mi4yOTIsMjI0LjM2eiIgZmlsbD0iIzU5ZDM4OSIvPgoJCQk8cGF0aCBkPSJNMzc2LjgwOSwyMjQuMzZjNC43NjYsMCw4LjYyOS0zLjg2Miw4LjYyOS04LjYyOXYtMTEuNTA2YzAtNC43NjctMy44NjQtOC42MjktOC42MjktOC42MjlzLTguNjI5LDMuODYyLTguNjI5LDguNjI5ICAgICB2MTEuNTA2QzM2OC4xOCwyMjAuNDk3LDM3Mi4wNDMsMjI0LjM2LDM3Ni44MDksMjI0LjM2eiIgZmlsbD0iIzU5ZDM4OSIvPgoJCQk8cGF0aCBkPSJNNDExLjMyNiwyMjQuMzZjNC43NjYsMCw4LjYyOS0zLjg2Miw4LjYyOS04LjYyOXYtMTEuNTA2YzAtNC43NjctMy44NjQtOC42MjktOC42MjktOC42MjlzLTguNjI5LDMuODYyLTguNjI5LDguNjI5ICAgICB2MTEuNTA2QzQwMi42OTcsMjIwLjQ5Nyw0MDYuNTYsMjI0LjM2LDQxMS4zMjYsMjI0LjM2eiIgZmlsbD0iIzU5ZDM4OSIvPgoJCQk8cGF0aCBkPSJNMTAwLjY3NCwyNDcuMzcxYzQuNzY2LDAsOC42MjktMy44NjIsOC42MjktOC42Mjl2LTExLjUwNmMwLTQuNzY3LTMuODY0LTguNjI5LTguNjI5LTguNjI5cy04LjYyOSwzLjg2Mi04LjYyOSw4LjYyOSAgICAgdjExLjUwNkM5Mi4wNDUsMjQzLjUwOCw5NS45MDksMjQ3LjM3MSwxMDAuNjc0LDI0Ny4zNzF6IiBmaWxsPSIjNTlkMzg5Ii8+CgkJCTxwYXRoIGQ9Ik0xMzUuMTkxLDI0Ny4zNzFjNC43NjYsMCw4LjYyOS0zLjg2Miw4LjYyOS04LjYyOXYtMTEuNTA2YzAtNC43NjctMy44NjQtOC42MjktOC42MjktOC42MjlzLTguNjI5LDMuODYyLTguNjI5LDguNjI5ICAgICB2MTEuNTA2QzEyNi41NjIsMjQzLjUwOCwxMzAuNDI1LDI0Ny4zNzEsMTM1LjE5MSwyNDcuMzcxeiIgZmlsbD0iIzU5ZDM4OSIvPgoJCQk8cGF0aCBkPSJNMTY5LjcwOCwyNDcuMzcxYzQuNzY2LDAsOC42MjktMy44NjIsOC42MjktOC42Mjl2LTExLjUwNmMwLTQuNzY3LTMuODY0LTguNjI5LTguNjI5LTguNjI5cy04LjYyOSwzLjg2Mi04LjYyOSw4LjYyOSAgICAgdjExLjUwNkMxNjEuMDc5LDI0My41MDgsMTY0Ljk0MiwyNDcuMzcxLDE2OS43MDgsMjQ3LjM3MXoiIGZpbGw9IiM1OWQzODkiLz4KCQkJPHBhdGggZD0iTTEwMC42NzQsMzA0Ljg5OWM0Ljc2NiwwLDguNjI5LTMuODYyLDguNjI5LTguNjI5di0xMS41MDZjMC00Ljc2Ny0zLjg2NC04LjYyOS04LjYyOS04LjYyOXMtOC42MjksMy44NjItOC42MjksOC42MjkgICAgIHYxMS41MDZDOTIuMDQ1LDMwMS4wMzYsOTUuOTA5LDMwNC44OTksMTAwLjY3NCwzMDQuODk5eiIgZmlsbD0iIzU5ZDM4OSIvPgoJCQk8cGF0aCBkPSJNMTM1LjE5MSwzMDQuODk5YzQuNzY2LDAsOC42MjktMy44NjIsOC42MjktOC42Mjl2LTExLjUwNmMwLTQuNzY3LTMuODY0LTguNjI5LTguNjI5LTguNjI5cy04LjYyOSwzLjg2Mi04LjYyOSw4LjYyOSAgICAgdjExLjUwNkMxMjYuNTYyLDMwMS4wMzYsMTMwLjQyNSwzMDQuODk5LDEzNS4xOTEsMzA0Ljg5OXoiIGZpbGw9IiM1OWQzODkiLz4KCQkJPHBhdGggZD0iTTE2OS43MDgsMzA0Ljg5OWM0Ljc2NiwwLDguNjI5LTMuODYyLDguNjI5LTguNjI5di0xMS41MDZjMC00Ljc2Ny0zLjg2NC04LjYyOS04LjYyOS04LjYyOXMtOC42MjksMy44NjItOC42MjksOC42MjkgICAgIHYxMS41MDZDMTYxLjA3OSwzMDEuMDM2LDE2NC45NDIsMzA0Ljg5OSwxNjkuNzA4LDMwNC44OTl6IiBmaWxsPSIjNTlkMzg5Ii8+CgkJCTxwYXRoIGQ9Ik0xMDAuNjc0LDM2Mi40MjdjNC43NjYsMCw4LjYyOS0zLjg2Miw4LjYyOS04LjYyOXYtMTEuNTA2YzAtNC43NjctMy44NjQtOC42MjktOC42MjktOC42MjlzLTguNjI5LDMuODYyLTguNjI5LDguNjI5ICAgICB2MTEuNTA2QzkyLjA0NSwzNTguNTY1LDk1LjkwOSwzNjIuNDI3LDEwMC42NzQsMzYyLjQyN3oiIGZpbGw9IiM1OWQzODkiLz4KCQkJPHBhdGggZD0iTTEzNS4xOTEsMzYyLjQyN2M0Ljc2NiwwLDguNjI5LTMuODYyLDguNjI5LTguNjI5di0xMS41MDZjMC00Ljc2Ny0zLjg2NC04LjYyOS04LjYyOS04LjYyOXMtOC42MjksMy44NjItOC42MjksOC42MjkgICAgIHYxMS41MDZDMTI2LjU2MiwzNTguNTY1LDEzMC40MjUsMzYyLjQyNywxMzUuMTkxLDM2Mi40Mjd6IiBmaWxsPSIjNTlkMzg5Ii8+CgkJCTxwYXRoIGQ9Ik0xNjkuNzA4LDM2Mi40MjdjNC43NjYsMCw4LjYyOS0zLjg2Miw4LjYyOS04LjYyOXYtMTEuNTA2YzAtNC43NjctMy44NjQtOC42MjktOC42MjktOC42MjlzLTguNjI5LDMuODYyLTguNjI5LDguNjI5ICAgICB2MTEuNTA2QzE2MS4wNzksMzU4LjU2NSwxNjQuOTQyLDM2Mi40MjcsMTY5LjcwOCwzNjIuNDI3eiIgZmlsbD0iIzU5ZDM4OSIvPgoJCQk8cGF0aCBkPSJNMTAwLjY3NCw0MTkuOTU1YzQuNzY2LDAsOC42MjktMy44NjIsOC42MjktOC42MjlWMzk5LjgyYzAtNC43NjctMy44NjQtOC42MjktOC42MjktOC42MjlzLTguNjI5LDMuODYyLTguNjI5LDguNjI5ICAgICB2MTEuNTA2QzkyLjA0NSw0MTYuMDkzLDk1LjkwOSw0MTkuOTU1LDEwMC42NzQsNDE5Ljk1NXoiIGZpbGw9IiM1OWQzODkiLz4KCQkJPHBhdGggZD0iTTEzNS4xOTEsNDE5Ljk1NWM0Ljc2NiwwLDguNjI5LTMuODYyLDguNjI5LTguNjI5VjM5OS44MmMwLTQuNzY3LTMuODY0LTguNjI5LTguNjI5LTguNjI5cy04LjYyOSwzLjg2Mi04LjYyOSw4LjYyOSAgICAgdjExLjUwNkMxMjYuNTYyLDQxNi4wOTMsMTMwLjQyNSw0MTkuOTU1LDEzNS4xOTEsNDE5Ljk1NXoiIGZpbGw9IiM1OWQzODkiLz4KCQkJPHBhdGggZD0iTTE2OS43MDgsNDE5Ljk1NWM0Ljc2NiwwLDguNjI5LTMuODYyLDguNjI5LTguNjI5VjM5OS44MmMwLTQuNzY3LTMuODY0LTguNjI5LTguNjI5LTguNjI5cy04LjYyOSwzLjg2Mi04LjYyOSw4LjYyOSAgICAgdjExLjUwNkMxNjEuMDc5LDQxNi4wOTMsMTY0Ljk0Miw0MTkuOTU1LDE2OS43MDgsNDE5Ljk1NXoiIGZpbGw9IiM1OWQzODkiLz4KCQkJPHBhdGggZD0iTTQxMS4zMjYsMjgxLjg4OGM0Ljc2NiwwLDguNjI5LTMuODYyLDguNjI5LTguNjI5di0xMS41MDZjMC00Ljc2Ny0zLjg2NC04LjYyOS04LjYyOS04LjYyOXMtOC42MjksMy44NjItOC42MjksOC42MjkgICAgIHYxMS41MDZDNDAyLjY5NywyNzguMDI1LDQwNi41NiwyODEuODg4LDQxMS4zMjYsMjgxLjg4OHoiIGZpbGw9IiM1OWQzODkiLz4KCQkJPHBhdGggZD0iTTQxMS4zMjYsMzM5LjQxNmM0Ljc2NiwwLDguNjI5LTMuODYyLDguNjI5LTguNjI5di0xMS41MDZjMC00Ljc2Ny0zLjg2NC04LjYyOS04LjYyOS04LjYyOXMtOC42MjksMy44NjItOC42MjksOC42MjkgICAgIHYxMS41MDZDNDAyLjY5NywzMzUuNTUzLDQwNi41NiwzMzkuNDE2LDQxMS4zMjYsMzM5LjQxNnoiIGZpbGw9IiM1OWQzODkiLz4KCQkJPHBhdGggZD0iTTQxMS4zMjYsMzk2Ljk0NGM0Ljc2NiwwLDguNjI5LTMuODYyLDguNjI5LTguNjI5di0xMS41MDZjMC00Ljc2Ny0zLjg2NC04LjYyOS04LjYyOS04LjYyOXMtOC42MjksMy44NjItOC42MjksOC42MjkgICAgIHYxMS41MDZDNDAyLjY5NywzOTMuMDgxLDQwNi41NiwzOTYuOTQ0LDQxMS4zMjYsMzk2Ljk0NHoiIGZpbGw9IiM1OWQzODkiLz4KCQkJPHBhdGggZD0iTTQxMS4zMjYsNDU0LjQ3MmM0Ljc2NiwwLDguNjI5LTMuODYyLDguNjI5LTguNjI5di0xMS41MDZjMC00Ljc2Ny0zLjg2NC04LjYyOS04LjYyOS04LjYyOXMtOC42MjksMy44NjItOC42MjksOC42MjkgICAgIHYxMS41MDZDNDAyLjY5Nyw0NTAuNjA5LDQwNi41Niw0NTQuNDcyLDQxMS4zMjYsNDU0LjQ3MnoiIGZpbGw9IiM1OWQzODkiLz4KCQkJPHBhdGggZD0iTTI1OC44NzYsMTM1LjE5MWMwLTQuNzY3LTMuODY0LTguNjI5LTguNjI5LTguNjI5aC02OS4wMzRjLTQuNzY2LDAtOC42MjksMy44NjItOC42MjksOC42MjkgICAgIGMwLDQuNzY3LDMuODY0LDguNjI5LDguNjI5LDguNjI5aDY5LjAzNEMyNTUuMDEzLDE0My44MiwyNTguODc2LDEzOS45NTgsMjU4Ljg3NiwxMzUuMTkxeiIgZmlsbD0iIzU5ZDM4OSIvPgoJCTwvZz4KCTwvZz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K'
    },
    {
      value: 'region',
      label: 'Вказати область',
      image: 'data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDUxMi4wMDIgNTEyLjAwMiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTEyLjAwMiA1MTIuMDAyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjE2cHgiIGhlaWdodD0iMTZweCI+CjxnPgoJPGc+CgkJPHBhdGggZD0iTTQ1MC4zMTgsNDY2LjMyNmMxLjI1LTcuOTk2LTAuNDczLTE4Ljg4OC03LjEzNS0yNS4xOThjLTQuMzk1LTQuMTYxLTEwLjIwOC01Ljc0LTE2LjM4NS00LjQ2ICAgIGMtNi42ODUsMS4yODctMTEuNjEtMC4wMDctMTguNDE4LTEuNzk4Yy0zLjA1OS0wLjgwNC02LjUyNy0xLjcxNi0xMC4zNTEtMi4zOTZjLTExLjMzNC0yLjAyMS0xNy40OCwyLjY0MS0yMC4xMzcsNS41OTggICAgYy0yLjU5NywyLjg4OC02LjQ5NSw5LjMyMS0zLjQxNSwxOS45MzVjMy4yODIsMTEuMzEyLDEyLjE1NywyNC4xMiwxOC42MzUsMzMuNDcybDEuNDE4LDIuMDQ4ICAgIGM1Ljg1LDguNDc5LDE1LjMyNywxMy40MiwyNS4xMzUsMTMuNDJjMS43NSwwLDMuNTExLTAuMTU3LDUuMjY1LTAuNDgxYzExLjIxMS0yLjA2NCwxOS41OTgtMTAuMjMzLDIyLjQzOS0yMS44NSAgICBjMC44MzUtMy40MTQsMC41MTItNi40OTMsMC4yNzctOC43NDJjLTAuMDY2LTAuNjQ0LTAuMTU1LTEuNDkyLTAuMTY0LTEuODkzYzAuMTA1LTAuMjIyLDAuMjY4LTAuNTM5LDAuMzk3LTAuNzkgICAgQzQ0OC42NTksNDcxLjY3Myw0NDkuODQxLDQ2OS4zNzQsNDUwLjMxOCw0NjYuMzI2eiBNNDMwLjU4OSw0NjMuMDQ3Yy0wLjEsMC4yMzItMC4zMjUsMC42Ny0wLjQ5NSwxLjAwMSAgICBjLTAuNzQ3LDEuNDUyLTEuNzcsMy40NC0yLjI2Niw2LjA5MWMtMC41NzEsMy4wNDQtMC4yODMsNS44MDItMC4wNzIsNy44MTVjMC4wNzIsMC43LDAuMTcyLDEuNjQ1LDAuMTU0LDIuMDM5ICAgIGMtMS4yMjksNC44NDUtNC4yNjQsNi4zNzctNi42MDUsNi44MDljLTIuOTE1LDAuNTM0LTcuMzY3LTAuMzU1LTEwLjMxOC00LjYzbC0xLjQ0MS0yLjA4MSAgICBjLTUuNjk1LTguMjItMTMuNDk1LTE5LjQ3Ny0xNS44NjgtMjcuNjU1Yy0wLjA0Mi0wLjE0NS0wLjA3OC0wLjI4Mi0wLjExMS0wLjQxMWMwLjI4LDAuMDI4LDAuNTk4LDAuMDcxLDAuOTU3LDAuMTM0ICAgIGMzLjAyNiwwLjUzOCw1LjgxNywxLjI3Myw4Ljc3LDIuMDQ5YzcuMzk5LDEuOTQ2LDE1Ljc2MSw0LjE0NSwyNi41NjEsMi4yMjhDNDMwLjQ0OSw0NTcuODk2LDQzMC45MTgsNDYwLjY1LDQzMC41ODksNDYzLjA0N3oiIGZpbGw9IiM1OWQzODkiLz4KCTwvZz4KPC9nPgo8Zz4KCTxnPgoJCTxwYXRoIGQ9Ik01MTEuNjg3LDI1Mi4zN2MtMC4xMzItMi4yOTItMC4yNTYtNC40NTgtMC4yNTYtNi4zMThjMC0xMS43MjUtMC41MDYtMjEuMzctMy4wMjYtMzMuMTU4ICAgIGMtMC4wNjItMS4wMzEsMC41OC0zLjgzNiwxLjAwNy01LjcwM2MxLjM5MS02LjA3NiwzLjI5NS0xNC4zOTYtMS43MjktMjEuMjNjLTQuNDI0LTYuMDE4LTExLjEzMS03LjM2My0xNi4wMjktOC4zNDYgICAgYy0yLjA0LTAuNDEtNS4xMjItMS4wMjktNS43Ny0xLjc2OGwtMjEuODYxLTI0LjkzYy0yLjg4LTMuMjg0LTQuNDA1LTcuMjAxLTYuMTctMTEuNzM3Yy0yLjc3OC03LjE0LTYuMjM2LTE2LjAyNy0xNS45NzUtMjMuMTQgICAgbC0xLjM1Ny0wLjk5Yy0xMS41OC04LjQ0MS0xOC41NjktMTMuNTM2LTIyLjY4Ny0yNS43NjljLTAuODkzLTIuNjUyLTEuNjM1LTYuMTA5LTIuNDE5LTkuNzcgICAgYy0yLjAyOS05LjQ1OS00LjMzLTIwLjE3OS0xMS4yMzgtMjcuNzFjLTMuMDQ3LTMuMzIzLTYuMTYxLTUuMTY0LTguNjYzLTYuNjQzYy0yLjc4MS0xLjY0My0zLjYyMS0yLjE5NC00LjUxMy0zLjkzOCAgICBjLTEuNTA2LTIuOTQzLTIuNjM0LTYuNjExLTMuODMtMTAuNDk0Yy0wLjY0Ny0yLjEwMi0xLjMxNi00LjI3NC0yLjA3NS02LjQxM2MtNC4yMDgtMTEuODYzLTExLjg5NC0xOS4wNjItMjAuNTU4LTE5LjI1NyAgICBjLTQuNDU4LTAuMDUyLTEyLjcyLDEuNjc1LTE4LjAwOSwxNC42OTNjLTUuMTQ1LDEyLjY2NS00LjM4NywyNS41MzQtMy43MTksMzYuODg2YzAuNTIyLDguODYxLDEuMDE1LDE3LjIzMi0xLjE2NywyNC42NjkgICAgYy0wLjMxMSwxLjA2MS0xLjE2OSwzLjU3NC0yLjQxNSw0LjAxNmMtMi4xMTEsMC43NTEtNy40MTgtMC42ODMtMTMuNDg2LTQuODY1Yy0yLjI5Mi0xLjU4LTQuOS0zLjEzOS03LjY2LTQuNzkgICAgYy02LjE3LTMuNjg5LTE1LjQ4LTkuMjU3LTE3LjI5OS0xMy44NTdjLTAuMTA3LTEuNTgxLDIuNTExLTYuMTk1LDMuOTI1LTguNjg1YzMuNDcxLTYuMTE3LDcuNzkzLTEzLjczLDUuNDg5LTIyLjAxMyAgICBjLTEuMzY0LTQuOTAzLTQuNzE0LTguODg0LTkuOTU5LTExLjgzMWMtOC4zNjQtNC43LTE5LjUzOC01LjEyNC0yOS4zOTgtNS40OThjLTMuNTA2LTAuMTMzLTYuODE4LTAuMjU4LTkuMzYtMC41NzEgICAgYy0xNC4zNzgtMS43NjUtMjkuNjEtMS4zOTctNDMuNTUxLDEzLjE1N2MtMi4yNjksMi4zNjktNC40MzIsNS4yMTMtNi43MjEsOC4yMjRjLTMuNDMxLDQuNTEyLTkuODE4LDEyLjkwOS0xMy4zMzgsMTMuMDA1ICAgIGMtMS44MDMsMC4wNDktNC4yMS0wLjkzLTYuOTgxLTIuMDYzYy00LjU4My0xLjg3NS0xMC4yODEtNC4yMDEtMTcuNDc0LTMuNjI2Yy0xMC40MzgsMC44NDctMTcuOTk1LDUuODg1LTI0LjAxMSwxMC43ICAgIGMtOS4xNTksNy4zMzMtMTcuOTY3LDE1LjMxNC0yNi40ODYsMjMuMDM0bC0yLjg5LDIuNjE2Yy0wLjUxNSwwLjQ2Ni0xLjAzMiwwLjkyLTEuNTQ3LDEuMzcxICAgIGMtMy4yNTcsMi44NTQtNy4zMSw2LjQwNy05Ljg4MSwxMi4wNjhjLTEuOTM5LDQuMjY4LTIuNTg5LDguMjg3LTMuMTEsMTEuNTE1Yy0wLjc4OCw0Ljg3MS0xLjE0Myw2LjA2Ni0zLjExMyw3LjY1NiAgICBjLTMuNTksMi44OTctOS43NzEsNC44NzEtMTUuNzQ4LDYuNzc5Yy0yLjU3OCwwLjgyMy01LjI0NSwxLjY3NS03LjczLDIuNjE1Yy0zLjkyLDEuNDg1LTguMDc2LDIuODc2LTEyLjQ3NCw0LjM1ICAgIGMtMjEuODY5LDcuMzI1LTQ5LjA4NiwxNi40NDEtNTcuOTg4LDQzLjgzOWMtMC40ODYsMS40OTQtMS4wMTQsMy4wNTUtMS41NTgsNC42NjRjLTMuMjQ0LDkuNjAxLTcuMjgzLDIxLjU0Ny02Ljg0NywzMi40MTkgICAgYzAuNDQxLDExLjAxNyw2LjQ0OSwyMC4wNjEsMTEuNzUyLDI4LjA0YzEuODE5LDIuNzM2LDMuNTM1LDUuMzIxLDQuODQ1LDcuNzE4YzQuNTQ0LDguMzIsNC42MSwxNS41NDYsNC42OTUsMjQuNjkzICAgIGMwLjA0OCw1LjM3OCwwLjEwNSwxMS40NzIsMS4xOTMsMTguMTEzYzAuNjUxLDMuOTcsMi4yMSw3LjMxNiwzLjQ2MywxMC4wMDVjMS4wMTIsMi4xNjksMS45NjgsNC4yMTksMS44MTEsNS4yNjIgICAgYy0wLjE3MiwxLjE0My0xLjg2NiwzLjYwMi0zLjEwMSw1LjM5OGMtMS43NDgsMi41MzgtMy43MjgsNS40MTYtNS4wMjMsOC44MzJjLTIuNjE5LDYuOTEzLTEuMzc0LDEyLjE3MSwwLjEzMywxNS4zNjQgICAgYzMuODY2LDguMTksMTIuOTMyLDExLjI2NCwyMC4yMTcsMTMuNzM1YzEuMzA0LDAuNDQzLDIuNjA1LDAuODgyLDMuODU1LDEuMzQ3YzE4LjM5Niw2LjgyNywzMS41NTIsMC43MjYsNDMuMTYtNC42NjIgICAgYzMuNzc2LTEuNzUzLDcuNjgxLTMuNTY1LDExLjc5My00Ljk3N2M1LjYwOC0xLjkyNiwxMS42MzktMi4yOTEsMTguMDI1LTIuNjc4YzMuNDQ3LTAuMjA5LDcuMDExLTAuNDI0LDEwLjcyMy0wLjg4NiAgICBjMTMuNzctMS43MSwyNy4wMzYtNi44MTEsNDEuNzUzLTE2LjA1NGMxNy44NjItMTEuMjE5LDM1LjQ5Ni0xNS41NjQsNTIuNDA1LTEyLjkxMWMxNi40MDQsMi41NjksMjkuNjE0LDExLjAwMSw0NC4xNzMsMjguMTkxICAgIGM3LjMxMiw4LjYzMywxNC4yODksMTMuOTYzLDIzLjMyOSwxNy44MTdjMS43MDUsMC43MjcsMy4zMiwxLjE0OCw0LjYzLDEuNDg1YzAuNDE2LDMuMjI1LDEuODU4LDguMTQ1LDcuNjAyLDExLjI4OCAgICBjNi4xODgsMy4zODQsMTIuMjA0LDEuNjM5LDE1LjgwMSwwLjU5NGMwLjU0OC0wLjE1OSwxLjI3Mi0wLjM2OCwxLjg1MS0wLjUwOGMwLjk2NCwxLjYxOSwyLjAyNyw1LjQwOSwyLjcsNy44MDQgICAgYzEuNDM0LDUuMTA3LDMuMDU4LDEwLjg5NCw2Ljc0OCwxNS41NmM3LjM1Myw5LjI5OSwxNy43MDcsMTUuMjQ3LDMwLjc2OSwxNy42ODNjMS4xMywwLjIxLDIuMDk5LDAuMzY0LDIuOTUzLDAuNSAgICBjMC42MDYsMC4wOTYsMS4zMzYsMC4yMTEsMS43MTIsMC4yOTNjMC4wOTgsMC4wNzUsMC4yNTMsMC4yMDEsMC40NzcsMC40MDFjMC4zNTYsMC41MjQsMC45OTQsMS44MjEsMS40MjgsMi43ICAgIGMxLjg4MywzLjgyMSw0LjQ2MSw5LjA1MywxMC4wNjEsMTEuNTk3YzIuMzQ0LDEuMDY2LDQuNzIyLDEuNTkzLDcuMDMsMS41OTNjMy4zNTQsMCw2LjU2MS0xLjExNCw5LjMwMy0zLjMwNiAgICBjMi45OS0yLjM5MSw0Ljc1MS01LjQ1OCw2LjMwNC04LjE2NGMwLjYzMy0xLjEsMS41NzctMi43NDUsMi4wOTItMy4yN2MxLjI2OS0wLjgwOCwxLjY1OS0wLjgzOSw1LjUsMC4wOTkgICAgYzIuODE4LDAuNjg3LDYuMzMzLDEuNTUsMTAuNTk5LDEuMzE2YzkuNS0wLjUwOCwxNC40OTItNi4zODIsMTcuNDc1LTkuODk0YzIuMDk4LTIuNDY5LDIuODI0LTMuMTc0LDMuOTM2LTMuNDMgICAgYzEuNTU3LTAuMzU4LDMuMTI3LTAuNTc2LDQuNzkxLTAuODA2YzYuMjYtMC44NjcsMTQuODM0LTIuMDU1LDIxLjYxMy0xMi4xMDZjNS4yNTctNy43OTUsNS4xNzgtMTYuMTMyLDUuMTE1LTIyLjgzICAgIGMtMC4wMDctMC43MTUtMC4wMTQtMS40MzEtMC4wMTQtMi4xNDZjMC01Ljc3MywwLjgzNS03LjMwNCw0LjM0OS0xMy43NWwwLjY5Ny0xLjI3OWMyLjYzNC00Ljg1MywwLjgzOC0xMC45MjItNC4wMTUtMTMuNTU4ICAgIGMtNC44NTMtMi42MzItMTAuOTIxLTAuODM4LTEzLjU1OCw0LjAxNWwtMC42ODEsMS4yNTFjLTMuOTQxLDcuMjI4LTYuNzg4LDEyLjQ1MS02Ljc4OCwyMy4zMmMwLDAuNzc3LDAuMDA3LDEuNTU2LDAuMDE1LDIuMzM0ICAgIGMwLjA1Miw1LjQ2OS0wLjAwMyw4Ljk0OC0xLjY5OSwxMS40NjJjLTEuNjg4LDIuNTAxLTIuNDY0LDIuNzQzLTcuNzc4LDMuNDc5Yy0xLjkyOCwwLjI2OC00LjExMSwwLjU3LTYuNTMsMS4xMjcgICAgYy03LjczMSwxLjc4LTExLjkxOSw2LjcwNy0xNC42ODksOS45N2MtMi40MDIsMi44MjUtMi42MTEsMi44MzctMy4zMDUsMi44NzRjLTEuMzI4LDAuMDY4LTIuODUzLTAuMzAzLTQuNzg3LTAuNzc0ICAgIGMtNC45NjItMS4yMTQtMTIuNDYxLTMuMDQxLTIxLjIxOCwyLjYwOWMtMy4xNTEsMi4wMzQtNS4yODksNC44NC02Ljg5OCw3LjQwMmMtMS4xNDItMi4xODYtMi41MjQtNC40NDgtNC41ODYtNi4zNDkgICAgYy00Ljc0Ni00LjM4LTguMTU3LTUuMTkyLTEyLjgyMS01LjkzYy0wLjY5OS0wLjExMS0xLjQ5MS0wLjIzNS0yLjQxNS0wLjQwOGMtOC4yODgtMS41NDUtMTQuNDIyLTQuOTU2LTE4Ljc0OS0xMC40MjggICAgYy0xLjIwNi0xLjUyNC0yLjI1NS01LjI2My0zLjE4Mi04LjU2MmMtMS44MjItNi40ODktNC4wODktMTQuNTY2LTEwLjg1Ni0xOS4zMTFjLTYuNDczLTQuNTQtMTMuMDUzLTMuMjkyLTE3LjE4OC0yLjE1OSAgICBjLTAuNTE0LTEuODgzLTEuNDcxLTMuOTg3LTMuMjkyLTUuOTM1Yy0zLjYxNi0zLjg2NC03Ljk0NC00Ljk3Ny0xMC44MDctNS43MTNjLTAuNzA0LTAuMTgtMS41MDItMC4zODYtMS44NDctMC41MzIgICAgYy02LjIyOC0yLjY1Ni0xMC41NDEtNi4wMDMtMTUuOTE1LTEyLjM0OGMtMTEuOTA5LTE0LjA2Mi0yOS4wNzYtMzAuNzUzLTU2LjMzNS0zNS4wMjNjLTIxLjgyMi0zLjQxNy00NC4wNjksMS44NzQtNjYuMTM1LDE1LjczMiAgICBjLTEyLjMxNyw3LjczNi0yMi42NzMsMTEuNzg5LTMzLjU4NCwxMy4xNDRjLTMuMDg2LDAuMzg0LTYuMTg1LDAuNTcyLTkuNDY2LDAuNzdjLTcuNDM5LDAuNDUxLTE1LjEzMSwwLjkxNi0yMy4zMTIsMy43MjYgICAgYy01LjA5NCwxLjc1LTkuNjc0LDMuODc1LTEzLjcxNSw1Ljc1MWMtMTAuMzYsNC44MDktMTcuMjA1LDcuOTgyLTI3Ljc4Myw0LjA1NGMtMS40MjYtMC41MjktMi45MDktMS4wMzMtNC4zOTUtMS41MzggICAgYy0yLjQyNC0wLjgyMi02LjIxNi0yLjEwNy04LjAzLTMuMTg1YzAuNDY4LTEuMTU0LDEuNjI5LTIuODQsMi43NTItNC40NzJjMi40Ny0zLjU4OSw1LjU0Ni04LjA1Niw2LjQwMy0xMy43NjIgICAgYzEuMDU0LTcuMDAzLTEuNTU2LTEyLjU5OS0zLjQ1OS0xNi42ODRjLTAuODQ4LTEuODItMS42NS0zLjUzOC0xLjg1NS00Ljc4OWMtMC44NC01LjEyNi0wLjg4NC05Ljk1NC0wLjkzMS0xNS4wNjQgICAgYy0wLjA5My0xMC4wMjItMC4xOTgtMjEuMzc5LTcuMTQxLTM0LjA5M2MtMS43MjQtMy4xNTgtMy43NjUtNi4yMjktNS43MzktOS4yYy00LjAzNy02LjA3NS04LjIxLTEyLjM1Ni04LjQyNy0xNy43NzQgICAgYy0wLjI4OC03LjE3NSwyLjk1Mi0xNi43NjEsNS44MTEtMjUuMjE3YzAuNTctMS42ODgsMS4xMjMtMy4zMjMsMS42MzItNC44ODljNS43ODktMTcuODE3LDI0Ljk5Mi0yNC4yNDcsNDUuMzIyLTMxLjA1NyAgICBjNC4zODUtMS40NjgsOC45Mi0yLjk4NywxMy4yMDEtNC42MDhjMS45OTItMC43NTUsNC4yOTYtMS40OTEsNi43MzQtMi4yNjhjNy4zNjktMi4zNTMsMTUuNzIyLTUuMDIxLDIyLjIyNS0xMC4yNjggICAgYzguMTEzLTYuNTQ4LDkuMzczLTE0LjMzNSwxMC4yOTItMjAuMDIyYzAuMzk5LTIuNDcsMC43NDUtNC42MDYsMS41NzgtNi40MzhjMC43NS0xLjY1MywyLjMzMy0zLjA5MSw0Ljg1Ni01LjMwMyAgICBjMC41OTMtMC41MTksMS4xODktMS4wNDMsMS43ODEtMS41NzlsMi45LTIuNjI2YzguMjk2LTcuNTE3LDE2Ljg3NC0xNS4yOTEsMjUuNTU3LTIyLjI0MmM1LjM4NS00LjMxMiw4Ljk0NC02LjA0MSwxMy4xMzEtNi4zOCAgICBjMi4zLTAuMTc1LDQuNjUxLDAuNzE1LDguMjg1LDIuMjAyYzQuMDM5LDEuNjUyLDkuMDY4LDMuNzExLDE1LjA5NywzLjU0NWMxMy4wOTUtMC4zNTYsMjEuNzUzLTExLjc0MSwyOC43MDktMjAuODg5ICAgIGMxLjkzNS0yLjU0NSwzLjc2NC00Ljk0OSw1LjI0NS02LjQ5NWM2Ljc2LTcuMDU3LDEzLjI0MS04Ljc5NSwyNi42NzQtNy4xNDJjMy4zNzksMC40MTUsNy4xMDEsMC41NTYsMTEuMDQsMC43MDUgICAgYzcuMjIsMC4yNzQsMTYuMjA4LDAuNjE1LDIwLjM2LDIuOTQ4YzAuMDYsMC4wMzQsMC4xMTUsMC4wNjYsMC4xNjgsMC4wOTdjLTAuNjA5LDEuNzE4LTIuMjQsNC41OTMtMy4yOTIsNi40NDUgICAgYy0zLjc4NSw2LjY2OC04Ljk3LDE1LjgwMi01LjI1NSwyNS41ODVjNC4yMiwxMS4xMDgsMTYuMTYsMTguMjUsMjUuNzU1LDIzLjk4N2MyLjQ3NiwxLjQ4Miw0LjgxNSwyLjg3OSw2LjU3Niw0LjA5NCAgICBjNi41OTIsNC41NDQsMTkuNDUsMTEuNTIzLDMxLjUyLDcuMjQ0YzUuMDIxLTEuNzgzLDExLjY4NS02LjIxNywxNC45MTQtMTcuMjMyYzMuMTU5LTEwLjc3MywyLjUzOS0yMS4yOTUsMS45NDEtMzEuNDcxICAgIGMtMC41ODUtOS45MjYtMS4xMzctMTkuMzExLDIuMDczLTI3LjY1N2MwLjQ3NiwwLjg4MSwwLjk2MiwxLjk0NSwxLjQwNSwzLjE5MmMwLjYxOCwxLjc0MiwxLjE5OCwzLjYyMywxLjgxMSw1LjYxNSAgICBjMS4zOTYsNC41MzEsMi44MzgsOS4yMTcsNS4xMzYsMTMuNzEyYzMuNTcsNi45ODIsOC41MjQsOS45MTEsMTIuMTQsMTIuMDQ5YzEuNzc5LDEuMDUyLDMuMDYyLDEuODExLDQuMTA1LDIuOTQ3ICAgIGMzLjIzNCwzLjUyNiw0LjkyOSwxMS40MjEsNi40MjMsMTguMzg4YzAuODY4LDQuMDQ0LDEuNzY1LDguMjI2LDMuMDE5LDExLjk1NGM2LjE0OCwxOC4yNjYsMTcuMTM2LDI2LjI3NiwyOS44NiwzNS41NDkgICAgbDEuMzQ0LDAuOTc5YzUuMDE4LDMuNjY1LDYuNzQ0LDguMTAyLDkuMTM0LDE0LjI0NWMyLjE0MSw1LjUwMiw0LjU2OCwxMS43MzYsOS43NzEsMTcuNjdsMjEuODYsMjQuOTMgICAgYzUuMTExLDUuODI4LDExLjkwNyw3LjE5MSwxNi44NjksOC4xODdjMC45NDksMC4xOSwyLjIwNiwwLjQ0MiwzLjE2NiwwLjY5OGMtMC4xOTUsMS40NDItMC42NTQsMy40NTEtMC45NjYsNC44MTIgICAgYy0xLjAwMyw0LjM4NC0yLjE0LDkuMzUyLTEuMDg5LDE0LjI0OGMyLjE3NywxMC4xNTYsMi42MDQsMTguMzQ5LDIuNjA0LDI5LjA3NGMwLDIuNDM1LDAuMTQ2LDQuOTkyLDAuMjg5LDcuNDY1ICAgIGMwLjI4Miw0LjkyNiwwLjYwMiwxMC41MDgtMC40MjUsMTMuODM0Yy0xLjYyOSw1LjI3NiwxLjMyNywxMC44NzIsNi42MDEsMTIuNTAzYzUuMjc3LDEuNjMxLDEwLjg3NC0xLjMyOCwxMi41MDQtNi42MDEgICAgQzUxMi40OTYsMjY2LjQ4LDUxMi4wNjcsMjU4Ljk4NCw1MTEuNjg3LDI1Mi4zN3oiIGZpbGw9IiM1OWQzODkiLz4KCTwvZz4KPC9nPgo8Zz4KCTxnPgoJCTxwYXRoIGQ9Ik00ODkuMjA4LDI5MS43NDVjLTQuMjYyLTIuMzE1LTEwLjQ2LTEuNDIyLTEzLjU2OCw0LjAzNmwtMC4wMDItMC4wMDFsLTAuMDc1LDAuMTM4Yy0wLjAxMywwLjAyMi0wLjAyNSwwLjA0Ni0wLjAzOCwwLjA2OSAgICBzLTAuMDI1LDAuMDQ4LTAuMDM4LDAuMDcxbC0wLjA3NCwwLjEzN2wwLjAwMiwwLjAwMWMtMi44OTIsNS41NzYtMC4yNzMsMTEuMjYzLDMuOTksMTMuNTgyYzEuNDM4LDAuNzgxLDMuMDk0LDEuMTk4LDQuNzgsMS4xOTggICAgYzMuMzExLDAsNi43MjktMS42MTEsOC43OTEtNS4yMjlsMC4wMDIsMC4wMDFsMC4wNzgtMC4xNDNjMC4wMTItMC4wMjEsMC4wMjMtMC4wNDIsMC4wMzQtMC4wNjMgICAgYzAuMDAyLTAuMDAzLDAuMDAzLTAuMDA2LDAuMDA1LTAuMDA4YzAuMDEyLTAuMDIyLDAuMDIzLTAuMDQzLDAuMDM1LTAuMDY1bDAuMDc2LTAuMTQybC0wLjAwMS0wLjAwMSAgICBDNDk2LjA5NCwyOTkuNzQ4LDQ5My40NzMsMjk0LjA2MSw0ODkuMjA4LDI5MS43NDV6IiBmaWxsPSIjNTlkMzg5Ii8+Cgk8L2c+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg=='
    },
    {
      value: 'coords',
      label: 'Вказати координати',
      image: 'data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIj8+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBoZWlnaHQ9IjE2cHgiIHZlcnNpb249IjEuMSIgdmlld0JveD0iMSAxIDU5MS43MjIgNTkxLjcyMiIgd2lkdGg9IjE2cHgiPgo8ZyBpZD0ic3VyZmFjZTEiPgo8cGF0aCBkPSJNIDI5NiAwIEMgMTMyLjUyNzM0NCAwIDAgMTMyLjUyNzM0NCAwIDI5NiBDIDAgNDU5LjQ3MjY1NiAxMzIuNTI3MzQ0IDU5MiAyOTYgNTkyIEMgNDU5LjQ3MjY1NiA1OTIgNTkyIDQ1OS40NzI2NTYgNTkyIDI5NiBDIDU5MS44MjAzMTIgMTMyLjU5NzY1NiA0NTkuNDAyMzQ0IDAuMTc5Njg4IDI5NiAwIFogTSAyOTYgNTc5LjE1NjI1IEMgMTM5LjU3ODEyNSA1NzkuMTU2MjUgMTIuNzc3MzQ0IDQ1Mi4zNTU0NjkgMTIuNzc3MzQ0IDI5NS45Mzc1IEMgMTIuNzc3MzQ0IDEzOS41MTU2MjUgMTM5LjU3ODEyNSAxMi43MTQ4NDQgMjk2IDEyLjcxNDg0NCBDIDQ1Mi40MjE4NzUgMTIuNzE0ODQ0IDU3OS4yMjI2NTYgMTM5LjUxNTYyNSA1NzkuMjIyNjU2IDI5NS45Mzc1IEMgNTc5LjIyMjY1NiAyOTUuOTUzMTI1IDU3OS4yMjI2NTYgMjk1Ljk4MDQ2OSA1NzkuMjIyNjU2IDI5NiBDIDU3OS4wNDI5NjkgNDUyLjM0Mzc1IDQ1Mi4zNDM3NSA1NzkuMDQyOTY5IDI5NiA1NzkuMjIyNjU2IFogTSAyOTYgNTc5LjE1NjI1ICIgc3R5bGU9IiBmaWxsLXJ1bGU6bm9uemVybztmaWxsLW9wYWNpdHk6MTsiIHN0cm9rZT0iIzU5ZDM4OSIgZmlsbD0iIzU5ZDM4OSIvPgo8cGF0aCBkPSJNIDU0Mi44NjcxODggMjk2IEMgNTQyLjkyNTc4MSAyMzAuNzIyNjU2IDUxNy4wNTA3ODEgMTY4LjEwMTU2MiA0NzAuOTI5Njg4IDEyMS45MDIzNDQgQyA0NzAuODEyNSAxMjEuNzAzMTI1IDQ3MC42ODc1IDEyMS41MTE3MTkgNDcwLjU0Njg3NSAxMjEuMzI0MjE5IEwgNDcwLjAzNTE1NiAxMjEuMDA3ODEyIEMgNDIzLjg0Mzc1IDc0LjkyMTg3NSAzNjEuMjQyMTg4IDQ5LjA3NDIxOSAyOTYgNDkuMTMyODEyIEMgMjMwLjcyMjY1NiA0OS4wNzQyMTkgMTY4LjEwMTU2MiA3NC45NDkyMTkgMTIxLjkwMjM0NCAxMjEuMDcwMzEyIEwgMTIxLjMyNDIxOSAxMjEuNDUzMTI1IEMgMTIxLjIxMDkzOCAxMjEuNjIxMDk0IDEyMS4xMDE1NjIgMTIxLjc5Mjk2OSAxMjEuMDA3ODEyIDEyMS45NjQ4NDQgQyA3NC45MjE4NzUgMTY4LjE1NjI1IDQ5LjA3NDIxOSAyMzAuNzU3ODEyIDQ5LjEzMjgxMiAyOTYgQyA0OS4wNzQyMTkgMzYxLjI3NzM0NCA3NC45NDkyMTkgNDIzLjg5ODQzOCAxMjEuMDcwMzEyIDQ3MC4wOTc2NTYgQyAxMjEuMTg3NSA0NzAuMjk2ODc1IDEyMS4zMTI1IDQ3MC40ODgyODEgMTIxLjQ1MzEyNSA0NzAuNjc1NzgxIEwgMTIxLjk2NDg0NCA0NzAuOTkyMTg4IEMgMTY4LjE1NjI1IDUxNy4wNzgxMjUgMjMwLjc1NzgxMiA1NDIuOTI1NzgxIDI5NiA1NDIuODY3MTg4IEMgMzYxLjI4OTA2MiA1NDIuOTE0MDYyIDQyMy45MTQwNjIgNTE3LjAwNzgxMiA0NzAuMDk3NjU2IDQ3MC44NjMyODEgTCA0NzAuNjc1NzgxIDQ3MC40ODA0NjkgQyA0NzAuNzg5MDYyIDQ3MC4zMTY0MDYgNDcwLjg5ODQzOCA0NzAuMTQ0NTMxIDQ3MC45OTIxODggNDY5Ljk2ODc1IEMgNTE3LjA1ODU5NCA0MjMuNzk2ODc1IDU0Mi45MTQwNjIgMzYxLjIyNjU2MiA1NDIuODY3MTg4IDI5NiBaIE0gNDY1LjgyMDMxMiA0NTYuOTM3NSBMIDQyOC42OTkyMTkgNDIwLjk2ODc1IEMgNDI2LjE1NjI1IDQxOC41MTU2MjUgNDIyLjExMzI4MSA0MTguNTg1OTM4IDQxOS42NjAxNTYgNDIxLjEyODkwNiBDIDQxNy4yMDcwMzEgNDIzLjY3MTg3NSA0MTcuMjc3MzQ0IDQyNy43MTQ4NDQgNDE5LjgyMDMxMiA0MzAuMTY3OTY5IEwgNDU2Ljc0NjA5NCA0NjYuMDExNzE5IEMgNDE0LjkxNzk2OSA1MDUuNjY3OTY5IDM1OS44ODY3MTkgNTI4LjQyOTY4OCAzMDIuMjYxNzE5IDUyOS44OTg0MzggTCAzMDEuNDMzNTk0IDQ3OC4xNDg0MzggQyAzMDEuNDMzNTk0IDQ3NC42MjEwOTQgMjk4LjU3MDMxMiA0NzEuNzU3ODEyIDI5NS4wNDI5NjkgNDcxLjc1NzgxMiBDIDI5MS41MTU2MjUgNDcxLjc1NzgxMiAyODguNjU2MjUgNDc0LjYyMTA5NCAyODguNjU2MjUgNDc4LjE0ODQzOCBMIDI4OS40ODQzNzUgNTI5LjcwNzAzMSBDIDIzMS44OTA2MjUgNTI4LjIxODc1IDE3Ni44Nzg5MDYgNTA1LjQ2MDkzOCAxMzUuMDYyNSA0NjUuODIwMzEyIEwgMTcxLjAzNTE1NiA0MjguNjk5MjE5IEMgMTczLjQ4ODI4MSA0MjYuMTU2MjUgMTczLjQxNzk2OSA0MjIuMTEzMjgxIDE3MC44NzUgNDE5LjY2MDE1NiBDIDE2OC4zMzIwMzEgNDE3LjIwNzAzMSAxNjQuMjg5MDYyIDQxNy4yNzczNDQgMTYxLjgzNTkzOCA0MTkuODIwMzEyIEwgMTI2LjA1NDY4OCA0NTYuNzQ2MDk0IEMgODYuMzc4OTA2IDQxNC45Njg3NSA2My41NzgxMjUgMzU5Ljk4ODI4MSA2Mi4wMzkwNjIgMzAyLjM5MDYyNSBMIDExMy43ODkwNjIgMzAxLjU1ODU5NCBDIDExNy4zMTY0MDYgMzAxLjU1ODU5NCAxMjAuMTc5Njg4IDI5OC42OTkyMTkgMTIwLjE3OTY4OCAyOTUuMTcxODc1IEMgMTIwLjE3OTY4OCAyOTEuNjQ0NTMxIDExNy4zMTY0MDYgMjg4Ljc4MTI1IDExMy43ODkwNjIgMjg4Ljc4MTI1IEwgNjIuMDM5MDYyIDI4OS42MTMyODEgQyA2My41MjczNDQgMjMyLjAxNTYyNSA4Ni4yODUxNTYgMTc3LjAwNzgxMiAxMjUuOTI5Njg4IDEzNS4xOTE0MDYgTCAxNjMuMDQ2ODc1IDE3MS4xNjAxNTYgQyAxNjUuNjIxMDk0IDE3My42ODM1OTQgMTY5Ljc1MzkwNiAxNzMuNjQwNjI1IDE3Mi4yODEyNSAxNzEuMDY2NDA2IEMgMTc0LjgwNDY4OCAxNjguNDg4MjgxIDE3NC43NTc4MTIgMTY0LjM1NTQ2OSAxNzIuMTgzNTk0IDE2MS44MzIwMzEgTCAxMzUuMjUzOTA2IDEyNi4wNTQ2ODggQyAxNzcuMDMxMjUgODYuMzc4OTA2IDIzMi4wMTU2MjUgNjMuNTc4MTI1IDI4OS42MTMyODEgNjIuMDM5MDYyIEwgMjkwLjQ0MTQwNiAxMTMuNzg5MDYyIEMgMjkwLjQ0MTQwNiAxMTcuMzE2NDA2IDI5My4zMDQ2ODggMTIwLjE3NTc4MSAyOTYuODMyMDMxIDEyMC4xNzU3ODEgQyAzMDAuMzU5Mzc1IDEyMC4xNzU3ODEgMzAzLjIxODc1IDExNy4zMTY0MDYgMzAzLjIxODc1IDExMy43ODkwNjIgTCAzMDIuMzkwNjI1IDYyLjAzOTA2MiBDIDM1OS45ODQzNzUgNjMuNTI3MzQ0IDQxNC45OTYwOTQgODYuMjg1MTU2IDQ1Ni44MDg1OTQgMTI1LjkyNTc4MSBMIDQyMC44Mzk4NDQgMTYzLjA0Njg3NSBDIDQxOC4zMTY0MDYgMTY1LjYyMTA5NCA0MTguMzYzMjgxIDE2OS43NTM5MDYgNDIwLjkzNzUgMTcyLjI3NzM0NCBDIDQyMy41MTE3MTkgMTc0LjgwMDc4MSA0MjcuNjQ0NTMxIDE3NC43NTc4MTIgNDMwLjE2Nzk2OSAxNzIuMTgzNTk0IEwgNDY2LjAxMTcxOSAxMzUuMjUzOTA2IEMgNTA1LjY2Nzk2OSAxNzcuMDgyMDMxIDUyOC40Mjk2ODggMjMyLjExNzE4OCA1MjkuODk4NDM4IDI4OS43MzgyODEgTCA0NzguMTQ4NDM4IDI5MC41NzAzMTIgQyA0NzQuNjIxMDk0IDI5MC41NzAzMTIgNDcxLjc2MTcxOSAyOTMuNDMzNTk0IDQ3MS43NjE3MTkgMjk2Ljk1NzAzMSBDIDQ3MS43NjE3MTkgMzAwLjQ4NDM3NSA0NzQuNjIxMDk0IDMwMy4zNDc2NTYgNDc4LjE0ODQzOCAzMDMuMzQ3NjU2IEwgNTI5LjcwNzAzMSAzMDIuNTE1NjI1IEMgNTI4LjIxODc1IDM2MC4xMTMyODEgNTA1LjQ2MDkzOCA0MTUuMTIxMDk0IDQ2NS44MjAzMTIgNDU2LjkzNzUgWiBNIDQ2NS44MjAzMTIgNDU2LjkzNzUgIiBzdHlsZT0iIGZpbGwtcnVsZTpub256ZXJvO2ZpbGwtb3BhY2l0eToxOyIgc3Ryb2tlPSIjNTlkMzg5IiBmaWxsPSIjNTlkMzg5Ii8+CjxwYXRoIGQ9Ik0gMzIxLjA0Mjk2OSAyNzIuNzQyMTg4IEMgMzIwLjU3MDMxMiAyNzIuMDM1MTU2IDMxOS45NjQ4NDQgMjcxLjQyNTc4MSAzMTkuMjU3ODEyIDI3MC45NTcwMzEgTCAyMDMuMTA1NDY5IDE5NC4yODkwNjIgQyAyMDAuMTkxNDA2IDE5Mi4yOTY4NzUgMTk2LjIxODc1IDE5My4wNDI5NjkgMTk0LjIyMjY1NiAxOTUuOTU3MDMxIEMgMTkyLjczNDM3NSAxOTguMTI4OTA2IDE5Mi43MzQzNzUgMjAwLjk5NjA5NCAxOTQuMjIyNjU2IDIwMy4xNjc5NjkgTCAyNzAuODkwNjI1IDMxOS4zMjAzMTIgQyAyNzEuMzYzMjgxIDMyMC4wMzEyNSAyNzEuOTcyNjU2IDMyMC42MzY3MTkgMjcyLjY3OTY4OCAzMjEuMTA5Mzc1IEwgMzg4LjgzMjAzMSAzOTcuNzc3MzQ0IEMgMzkxLjc0NjA5NCAzOTkuNzY5NTMxIDM5NS43MTg3NSAzOTkuMDIzNDM4IDM5Ny43MTA5MzggMzk2LjEwOTM3NSBDIDM5OS4xOTkyMTkgMzkzLjkzNzUgMzk5LjE5OTIxOSAzOTEuMDY2NDA2IDM5Ny43MTA5MzggMzg4Ljg5NDUzMSBaIE0gMjgwLjg1OTM3NSAzMTEuMDc4MTI1IEwgMjIyLjA3ODEyNSAyMjIuMDgyMDMxIEwgMzExLjA3ODEyNSAyODAuODU5Mzc1IEwgMzY5Ljg1NTQ2OSAzNjkuOTIxODc1IFogTSAyODAuODU5Mzc1IDMxMS4wNzgxMjUgIiBzdHlsZT0iIGZpbGwtcnVsZTpub256ZXJvO2ZpbGwtb3BhY2l0eToxOyIgc3Ryb2tlPSIjNTlkMzg5IiBmaWxsPSIjNTlkMzg5Ii8+CjwvZz4KPC9zdmc+Cg=='
    }
  ]
  constructor(private router: Router) { }
  setSearchType(type: any) {
    switch (type) {
      case 'location':
        this.getCurrentPosition();
        break;

      default:
        break;
    }
  }

  getCurrentPosition() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.helperModel = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        zoom: 16
      };
    }, (err) => {
      console.log(err);
    }, { enableHighAccuracy: true });
  }

  getAddress(event: any, formControl: any) {
    console.log(event);
    this.helperModel.longitude = event.geometry.location.lng();
    this.helperModel.latitude = event.geometry.location.lat();
    this.router.navigate(['trucks'], { queryParams: { lat: this.helperModel.latitude, lng:this.helperModel.longitude } });
  }
}
