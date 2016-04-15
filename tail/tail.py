# coding=utf-8
import sys
import time
# 打开文件
# with open('test.txt') as f:
# 	f.seek(0,2)
# 	while True:
# 		last_pos = f.tell()
# 		line = f.readline()
# 		if line:
# 			print line


class Tail():
	def __init__(self,file_name,callback=sys.stdout.write):
		self.file_name = file_name
		self.callback = callback
	def follow(self,n=10):


		with open(self.file_name) as f:
			self._file = f
			self._file.seek(0,2)
			self.file_length = self._file.tell()
			self.showLastLine(n)
			while True:
				line = self._file.readline()
				if line:
					self.callback(line)
		try:
			pass
		except Exception,e:
			print '打开文件失败，囧，看看文件是不是不存在，或者权限有问题'
			print e
	def showLastLine(self, n):
		# 一行大概100个吧 
		len_line = 100
		
		read_len = len_line*n
		
		


		while True:
			self._file.seek(-read_len, 2)
			last_words = self._file.read(read_len)
			count = last_words.count('\n')
			if count>=10:
				last_lines = last_words.split('\n')[-10:]
				break
			else:
				# break
				#不够十行
				read_len = (read_len/count)*n
		for line in last_lines:
			self.callback(line+'\n')



# print range(20)[-10:]
py_tail = Tail('test.txt')
py_tail.follow()

# def test_tail(line):
#     print 'xx'+line+'xx'

# py_tail1 = Tail('test.txt', test_tail)
# py_tail1.follow()

