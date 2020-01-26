import requests
if __name__ == "__main__":
    for number in range(10,34):
        url = 'https://mat1.gtimg.com/pingjs/ext2020/weather/pc/icon/currentweather/night/%s.png' % number
        content = requests.get(url).content
        fileName = '%s.png' % number
        f = open(fileName,'wb')
        f.write(content)

