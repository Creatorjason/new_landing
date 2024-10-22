import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";
import axios from 'axios';
import { X, Copy, CheckCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const FiatonModal = ({ isOpen, onClose, session }) => {
  const [fiatons, setFiatons] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [copiedFiaton, setCopiedFiaton] = useState(null);

  useEffect(() => {
    const fetchFiatons = async () => {
      if (session && isOpen) {
        try {
          const response = await axios.get(`https://api.granularx.com/fiatons/view/${session.user.username}`, {
            headers: {
              'Authorization': `Bearer ${session.authToken}`,
              'x-csrf-token': session.csrfToken,
            },
          });
          if (response.data.status === "SUCCESS") {
            setFiatons(response.data.data);
          } else {
            setError("Failed to fetch fiatons");
          }
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchFiatons();
  }, [session, isOpen]);

  const copyToClipboard = (fiaton) => {
    navigator.clipboard.writeText(fiaton);
    setCopiedFiaton(fiaton);
    // toast({
    //   title: "Copied to clipboard",
    //   description: "The fiaton has been copied to your clipboard.",
    // });
    setTimeout(() => setCopiedFiaton(null), 2000);
  };

  const modalVariants = {
    hidden: { opacity: 0, y: "-100vh" },
    visible: { opacity: 1, y: "0" },
    exit: { opacity: 0, y: "100vh" }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={onClose}
        >
          <motion.div
            className="bg-white dark:bg-gray-800 w-full max-w-md p-6 rounded-lg shadow-xl"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Fiatons</h2>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            {loading ? (
              <div className="flex justify-center items-center h-40">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-white"></div>
              </div>
            ) : error ? (
              <p className="text-red-500 text-center">{error}</p>
            ) : (
              <div className="max-h-[60vh] overflow-y-auto">
                <Accordion type="single" collapsible className="w-full">
                  {Object.entries(fiatons).map(([currency, fiatonList]) => (
                    <AccordionItem key={currency} value={currency}>
                      <AccordionTrigger>{currency}</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2">
                          {fiatonList.map((fiaton, index) => (
                            <div key={index} className="flex justify-between items-center p-2 bg-gray-100 dark:bg-gray-700 rounded-md">
                              <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{fiaton}</span>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => copyToClipboard(fiaton)}
                              >
                                {copiedFiaton === fiaton ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                              </Button>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FiatonModal;
