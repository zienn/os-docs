# coding=utf-8
import sys
import time

class Tail():
	def __init__(self,file_name,callback=sys.stdout.write):
		self.file_name = file_name
		self.callback = callback
	def follow(self,n=10):
		try:
			with open(self.file_name) as f:
				self._file = f
				self._file.seek(0,2)
				self.file_length = self._file.tell()
				self.showLastLine(n)
				while True:
					line = self._file.readline()
					if line:
						self.callback(line)
					time.sleep(1)
		except Exception,e:
			print '打开文件失败，囧，看看文件是不是不存在，或者权限有问题'
			print e
	def showLastLine(self, n):
		len_line = 100
		read_len = len_line*n
		while True:
			if read_len>self.file_length:
				self._file.seek(0)
				last_lines = self._file.read().split('\n')[-n:]
				break
			self._file.seek(-read_len, 2)
			last_words = self._file.read(read_len)
			count = last_words.count('\n')			
			if count>=n:
				last_lines = last_words.split('\n')[-n:]
				break
			else:
				if count==0:
					len_perline = read_len
				else:
					len_perline = read_len/count
				read_len = len_perline * n
		for line in last_lines:
			self.callback(line+'\n')
if __name__ == '__main__':
	py_tail = Tail('test.txt')
	py_tail.follow()

