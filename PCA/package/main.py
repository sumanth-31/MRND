import logging
from p1 import m1,m3
from p1.p2 import m2
from p1.p3 import m4

if __name__=="__main__":
    logger=logging.getLogger(__name__)
    filehandler=logging.FileHandler(filename='main.log')
    filehandler.setLevel(logging.INFO)
    streamhandler=logging.StreamHandler()
    streamhandler.setLevel(logging.WARNING)
    logger.addHandler(filehandler)
    logger.addHandler(streamhandler)
    logger.setLevel(logging.INFO)
    logger.propagate=False
    logger.info('entering main')
    m1.f1()
    m1.f2()
    m2.f3()
    m2.f4()
    m3.f5()
    m4.f6()
    logger.info('exiting main')